import bikeImage from '@/assets/bike-image.png';
import FormInput from '@/components/form/form-input';
import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import useConfirm from '@/hooks/use-confirm';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetProductDataQuery } from '@/redux/features/products/productsApi';
import { useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCartPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const CheckoutPage = () => {
  const user = useAppSelector(selectCurrentUser);

  const [orderInfo, setOrderInfo] = useState({ totalPrice: 0, quantity: 0 });
  const [ConfirmDialog, confirmOrder] = useConfirm({
    title: 'Are you sure to order?',
    description: (
      <p>
        You are going to order{' '}
        <span className="text-red-500 font-semibold">
          {orderInfo?.quantity}
        </span>{' '}
        items and the total amount is{' '}
        <span className="text-red-500 font-semibold">
          ৳{orderInfo?.totalPrice}
        </span>
      </p>
    ),
  });

  const { productId } = useParams();

  // Fetch product details
  const { data: product, isLoading } = useGetProductDataQuery({
    productId: productId || '',
  });

  // Validation
  const validationSchema = z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(1, 'Name is required'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('This is not a valid email address'),
    address: z
      .string({ required_error: 'Address is required' })
      .min(1, 'Address is required'),
    quantity: z
      .number({ invalid_type_error: 'Enter a valid number' })
      .min(1, 'Minimum order quantity must be 1'),
  });

  // Form
  const formMethod = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: '',
      quantity: 1,
    },
    resolver: zodResolver(validationSchema),
  });

  // Get total price
  const getTotalPrice = (quantity: number) => {
    return product && product?.quantity && quantity > 0
      ? product.price * (quantity || 0)
      : 0;
  };

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    const totalPrice = getTotalPrice(values?.quantity || 0);
    setOrderInfo({ totalPrice, quantity: values?.quantity });

    const ok = await confirmOrder();
    if (!ok) return;

    console.log({ ok });
  };

  const quantity = formMethod.watch('quantity') || 0;
  const totalPrice = getTotalPrice(quantity);

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
          <div>
            <div className="h-8 w-3/4 mb-4 bg-gray-300 animate-pulse"></div>
            <div className="h-6 w-1/2 mb-4 bg-gray-300 animate-pulse"></div>
            <div className="h-32 w-full mb-4 bg-gray-300 animate-pulse"></div>
            <div className="h-10 w-1/3 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-10 text-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={product?.image || bikeImage}
          alt={product.name}
          className="w-full h-96 object-contain bg-accent rounded-lg"
        />

        {/* Order Form */}
        <FormProvider {...formMethod}>
          <form onSubmit={formMethod.handleSubmit(handleSubmit)}>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2 mb-6">৳{product.price}</p>

            <FormInput
              name="quantity"
              label="Quantity"
              type="number"
              onChange={(value) => {
                if (Number(value) > product?.quantity) {
                  toast.error(
                    `Only ${product?.quantity} quantity is available.`
                  );
                  formMethod.setValue(
                    'quantity',
                    Math.min(Number(value), product?.quantity)
                  );
                }
              }}
            />

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                User Details
              </h3>
              <FormInput name="name" label="Full Name" />
              <FormInput name="email" type="email" label="Email Address" />
              <FormInput name="address" label="Shipping Address" />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Price
              </h3>
              <p className="text-xl font-bold text-gray-800">৳{totalPrice}</p>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full md:w-auto bg-red-500 hover:bg-red-600 h-10 !px-10 flex"
            >
              <FaCartPlus /> Order Now
            </Button>
          </form>
        </FormProvider>
      </div>
      <ConfirmDialog />
    </Container>
  );
};

export default CheckoutPage;

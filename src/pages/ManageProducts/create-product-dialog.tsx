import FormInput from '@/components/form/form-input';
import FormSelect from '@/components/form/form-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/redux/features/products/productsApi';
import { TProduct } from '@/types/common'; // Make sure this type exists and is correct
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { brandOptions, categoryOptions } from '../Products/default-data';

interface IProps {
  isUpdating?: boolean;
  product?: TProduct | null;
  open: boolean;
  onClose: (state: boolean) => void;
}

const validationSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  brand: z.string().min(1, 'Product brand is required'),
  price: z.number().min(1, 'Product price is required'),
  category: z.string().min(1, 'Product category is required'),
  quantity: z.number().min(1, 'Product quantity is required'),
});

const CreateOrUpdateProductDialog = ({
  isUpdating,
  product,
  open,
  onClose,
}: IProps) => {
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();

  const formMethods = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      brand: product?.brand || '',
      price: product?.price || 0,
      category: product?.category || 'Mountain',
      quantity: product?.quantity || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    const payload = {
      ...values,
      inStock: values.quantity > 0,
    };

    if (isUpdating && product?._id) {
      // Update product
      toast.loading('Updating product...', { id: 'update-product' });
      try {
        await updateProduct({ id: product._id, body: payload }).unwrap();
        toast.success('Product updated successfully', { id: 'update-product' });
        onClose(false);
      } catch (error) {
        toast.error(
          (error as { data: { message: string } })?.data?.message ||
            'Failed to update product',
          { id: 'update-product' }
        );
      }
    } else {
      // Create product
      toast.loading('Creating product...', { id: 'create-product' });
      try {
        await createProduct(payload).unwrap();
        toast.success('Product created successfully', { id: 'create-product' });
        onClose(false);
      } catch (error) {
        toast.error(
          (error as { data: { message: string } })?.data?.message ||
            'Failed to create product',
          { id: 'create-product' }
        );
      }
    }
  };

  const isLoading = isCreating || isUpdatingProduct;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdating ? 'Update Product' : 'Create New Product'}
          </DialogTitle>
          <DialogDescription>
            {isUpdating
              ? 'Edit the product details below.'
              : 'Fill in the details to create a new product.'}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormInput
                disabled={isLoading}
                name="name"
                label="Product Name"
              />
              <FormInput
                disabled={isLoading}
                name="description"
                label="Description"
              />
              <FormSelect
                disabled={isLoading}
                name="brand"
                label="Brand"
                options={brandOptions.filter((item) => item.value !== '-')}
                placeholder="Select brand"
              />
              <FormInput
                disabled={isLoading}
                name="price"
                type="number"
                label="Price"
              />
              <FormSelect
                disabled={isLoading}
                name="category"
                label="Category"
                options={categoryOptions.filter((item) => item.value !== '-')}
                placeholder="Select Category"
              />
              <FormInput
                disabled={isLoading}
                name="quantity"
                type="number"
                label="Quantity"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isUpdating ? 'Update Product' : 'Save Product'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateProductDialog;

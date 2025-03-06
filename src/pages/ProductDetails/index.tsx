import bikeImage from '@/assets/bike-image.png';
import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProductDataQuery } from '@/redux/features/products/productsApi';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Fetch product details
  const { data: product, isLoading } = useGetProductDataQuery({
    productId: productId || '',
  });

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-10 w-1/3" />
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

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">৳{product.price}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>

          <Button
            className="mt-6 w-full md:w-auto bg-red-500 hover:bg-red-600"
            onClick={() => navigate(`/checkout/${productId}`)}
          >
            <FaCartPlus /> Buy Now
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailsPage;

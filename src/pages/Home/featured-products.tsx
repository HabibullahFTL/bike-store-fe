import ProductCard from '@/components/common/product-card';
import { useGetAllProductsQuery } from '@/redux/features/products/productsApi';

const FeaturedProducts = () => {
  const { data } = useGetAllProductsQuery({
    limit: '6',
    page: '1',
  });

  console.log({ data });

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Top Picks for Every Ride
        </h2>
        <p className="text-gray-600 mb-10">
          Explore our best-selling bikes, built for speed, adventure, and daily
          commutes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.data?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

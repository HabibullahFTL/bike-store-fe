import ProductCard from '@/components/common/product-card';
import Container from '@/components/layouts/main-layout/container';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useGetAllProductsQuery } from '@/redux/features/products/productsApi';
import { TProduct } from '@/types/common';
import { useState } from 'react';
import { sortFormats } from './default-data';
import SearchAndFilter from './search-and-filter';

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('-');
  const [brand, setBrand] = useState('-');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStock] = useState(false);
  const [sort, setSort] = useState<string>('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching, isLoading } = useGetAllProductsQuery({
    limit,
    page,
    search: search || undefined,
    category: category !== '-' ? category : undefined,
    brand: brand !== '-' ? brand : undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    inStock: inStock ? true : undefined,
    sortBy: sortFormats?.[sort as keyof typeof sortFormats]?.sortBy,
    sortOrder: sortFormats?.[sort as keyof typeof sortFormats]?.sortOrder as
      | 'asc'
      | 'desc',
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <Container className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Products</h1>

      {/* Search and filter  */}
      <SearchAndFilter
        sort={sort}
        brand={brand}
        search={search}
        category={category}
        priceRange={priceRange}
        setPage={setPage}
        setSort={setSort}
        setBrand={setBrand}
        setCategory={setCategory}
        setPriceRange={setPriceRange}
        handleSearch={handleSearch}
      />

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-96">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500 h-full flex justify-center items-center">
            Loading products...
          </p>
        ) : (data?.data || []).length > 0 ? (
          (data?.data || []).map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 h-full flex justify-center items-center">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`${
                  page === 1 || isFetching
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  className={isFetching ? 'pointer-events-none opacity-50' : ''}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`${
                  page === totalPages || isFetching
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Container>
  );
};

export default ProductsPage;

import ProductCard from '@/components/common/product-card';
import Container from '@/components/layouts/main-layout/container';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
import Slider from 'rc-slider';
import { useState } from 'react';

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isFetching, isLoading } = useGetAllProductsQuery({
    limit,
    page,
    search: search || undefined,
    category: category || undefined,
    brand: brand || undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    inStock: inStock ? true : undefined,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <Container className="mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Products</h1>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Input
          placeholder="Search by name, brand, or category"
          value={search}
          onChange={handleSearch}
          className="col-span-1 md:col-span-2"
        />
        <select
          className="border rounded-md px-4 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          className="border rounded-md px-4 py-2"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Brands</option>
          <option value="Giant">Giant</option>
          <option value="Trek">Trek</option>
          <option value="Cannondale">Cannondale</option>
        </select>
      </div>

      {/* Price & Stock Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
          </span>
          <Slider
            range
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onChange={(values) => setPriceRange(values as number[])}
            styles={{
              track: { backgroundColor: 'black' },
              handle: { borderColor: 'black', backgroundColor: 'black' },
              rail: { backgroundColor: '#ccc' },
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="inStock"
            checked={inStock}
            onCheckedChange={(checked: boolean) => {
              setInStock(checked);
              setPage(1);
            }}
          />
          <label htmlFor="inStock" className="text-sm">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">
            Loading products...
          </p>
        ) : (data?.data || []).length > 0 ? (
          (data?.data || []).map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
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

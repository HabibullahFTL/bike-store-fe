import bikeImage from '@/assets/bike-image.png';
import Container from '@/components/layouts/main-layout/container';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useOrdersQuery } from '@/redux/features/orders/ordersApi';
import { TProduct } from '@/types/common';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useOrdersQuery({ page, limit });

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        My Orders
      </h2>

      {isLoading ? (
        <Container className="py-28 text-center">
          <p className="text-gray-500 text-lg">Loading orders...</p>
        </Container>
      ) : (
        <div className="grid gap-3">
          {data?.data?.map((order) => (
            <Card key={order?._id} className="border rounded-lg shadow-md p-3">
              <CardContent className="flex items-center space-x-4 px-0">
                <Link to={`/orders/${order._id}`}>
                  <img
                    src={(order?.product as TProduct)?.image || bikeImage}
                    alt={(order?.product as TProduct)?.name || 'Product Image'}
                    className="w-20 h-20 object-contain bg-accent rounded-lg"
                  />
                </Link>
                <div className="flex-1 gap-1">
                  <Link to={`/orders/${order._id}`}>
                    {' '}
                    <h1 className="text-xl font-bold text-gray-800">
                      {(order?.product as TProduct)?.name}
                    </h1>
                  </Link>
                  <div className="flex justify-between gap-2 items-center">
                    <p className="text-sm text-gray-600">
                      <span className="text-base">৳</span>{' '}
                      {(order?.product as TProduct)?.price}
                    </p>
                    <p className="text-gray-700">Qty: {order.quantity}</p>
                  </div>
                  <p className="text-gray-700 text-end font-semibold">
                    Total: <span className="text-base">৳</span>{' '}
                    {order?.totalPrice}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
    </>
  );
};

export default MyOrders;

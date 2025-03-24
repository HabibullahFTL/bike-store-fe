import OrderCard from '@/components/common/order-card';
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
import { useOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useState } from 'react';

const ManageOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useOrdersQuery({ page, limit });

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Manage Orders
      </h2>

      {isLoading ? (
        <Container className="py-28 text-center">
          <p className="text-gray-500 text-lg">Loading orders...</p>
        </Container>
      ) : (
        <div className="grid gap-3">
          {data?.data?.map((order) => (
            <OrderCard
              key={order?._id}
              order={order}
              showManageOptions={true}
            />
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

export default ManageOrders;

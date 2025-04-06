import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useConfirm from '@/hooks/use-confirm';
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '@/redux/features/products/productsApi';
import { TProduct } from '@/types/common';
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import CreateProductDialog from './create-product-dialog';

const ManageProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<TProduct>();
  const [DeleteDialog, confirmDelete] = useConfirm({
    title: <>Are you sure you want to delete the product ?</>,
    description: (
      <>
        You are going to delete the product{' '}
        <span className="text-red-500 font-medium">
          {selectedProduct?.name}
        </span>
        . This action cannot be undone after deleting.
      </>
    ),
  });

  const limit = 10;
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    page,
    limit,
  });
  const [deleteProduct] = useDeleteProductMutation();

  const handleEditProduct = async (product: TProduct) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };
  const handleDeleteProduct = async (product: TProduct) => {
    setSelectedProduct(product);

    const ok = await confirmDelete();

    if (!ok) {
      setSelectedProduct(undefined);
      return;
    }
    toast.loading('Deleting the product...', { id: 'deleting-product' });
    deleteProduct(product?._id)
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success('Deleted the product successfully', {
            id: 'deleting-product',
          });
        } else {
          toast.error('Failed to delete the product', {
            id: 'deleting-product',
          });
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message || 'Failed to delete the product', {
          id: 'deleting-product',
        });
      });
  };

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Manage Products
        </h2>

        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon /> Add Product{' '}
        </Button>
      </div>

      {isLoading ? (
        <Container className="py-28 text-center">
          <p className="text-gray-500 text-lg">Loading products...</p>
        </Container>
      ) : (
        <div className="overflow-x-auto bg-gray-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((product, index: number) => (
                <TableRow key={product?._id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>
                    <div className="w-[130px] truncate">{product?.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="w-[70px] truncate">{product?.brand}</div>
                  </TableCell>
                  <TableCell>{`৳${product?.price.toLocaleString()}`}</TableCell>
                  <TableCell>{product?.category}</TableCell>
                  <TableCell>
                    <div className="w-[65px] truncate text-sm">
                      {' '}
                      {product?.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product)}
                        >
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      <DeleteDialog />
      <CreateProductDialog
        isUpdating={showUpdateModal}
        product={showUpdateModal ? selectedProduct : undefined}
        open={showCreateModal || showUpdateModal}
        onClose={(state) => {
          setSelectedProduct(undefined);
          setShowCreateModal(state);
          setShowUpdateModal(state);
        }}
      />
    </>
  );
};

export default ManageProducts;

import bikeImage from '@/assets/bike-image.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useConfirm from '@/hooks/use-confirm';
import {
  orderStatusActions,
  orderStatuses,
  orderStatusTransitions,
} from '@/lib/common/order-status';
import { cn } from '@/lib/utils';
import { useChangeOrderStatusMutation } from '@/redux/features/orders/ordersApi';
import { IOrderData, TProduct } from '@/types/common';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import OrderDetailsCard from './order-details-card';
import OrderTimeline from './order-timeline';

interface IProps {
  order: IOrderData | null;
  onClose: (state: boolean) => void;
}

const ChangeOrderStatusDialog = ({ order, onClose }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [changeOrderStatus, { isLoading: isChangingOrderStatus }] =
    useChangeOrderStatusMutation();

  const [ConfirmDialog, confirm] = useConfirm({
    title: (
      <>
        Are you sure to change order status to{' '}
        <span className="font-medium text-red-500">{selectedStatus}</span>?
      </>
    ),
    description:
      'This will change the order status. Make sure this is the right step, as some changes can’t be undone.',
  });

  const handleChangeStatus = async (
    newStatus: (typeof orderStatuses)[number]
  ) => {
    if (!order || isChangingOrderStatus) return;
    try {
      setSelectedStatus(newStatus);

      const ok = await confirm();

      if (!ok) return;

      toast.loading('Changing order status...', { id: 'change-order-status' });
      changeOrderStatus({ id: order?._id, status: newStatus })
        .unwrap()
        .then((data) => {
          if (data) {
            toast.success('Successfully changed the order status', {
              id: 'change-order-status',
            });

            onClose(false);
          } else {
            toast.error('Something went wrong. Please try again.', {
              id: 'change-order-status',
            });
          }
        })
        .catch((error) => {
          toast.error(
            error?.response?.message ||
              'Failed to change order status. Please try again.',
            {
              id: 'change-order-status',
            }
          );
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setSelectedStatus('');
    }
  };

  const currentStatus = order?.status as (typeof orderStatuses)[number];
  const allowedStatuses = orderStatusTransitions[currentStatus] || [];

  return (
    <>
      <Dialog open={!!order} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle> Change Order Status</DialogTitle>
            <DialogDescription className="sr-only">
              Change Order Status
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[68vh] overflow-y-auto">
            <div className="border rounded-md p-4 shadow">
              <h3 className="text-lg font-medium mb-3">
                Available status options for changing{' '}
                <span className="text-red-500">order status</span>:
              </h3>
              <div className="flex flex-wrap gap-2">
                {allowedStatuses.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No transitions available.
                  </p>
                )}
                {allowedStatuses.map((status) => (
                  <Button
                    key={status}
                    disabled={isLoading || isChangingOrderStatus}
                    onClick={() => handleChangeStatus(status)}
                    className={cn(
                      'capitalize',
                      status === 'Cancelled' || status === 'Refunded'
                        ? 'bg-red-500 hover:bg-red-600'
                        : ''
                    )}
                  >
                    {orderStatusActions?.[status] || status}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Product Card */}
              <div className="space-y-4">
                <Card className="border rounded-lg shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      Product Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex space-x-4">
                    <img
                      src={(order?.product as TProduct)?.image || bikeImage}
                      alt={
                        (order?.product as TProduct)?.name || 'Product Image'
                      }
                      className="w-20 h-20 object-contain bg-accent rounded-lg"
                    />
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        {(order?.product as TProduct)?.name}
                      </h1>
                      <div className="flex justify-between gap-2 items-center">
                        <p className="text-sm text-gray-600">
                          <span className="text-base">৳</span>{' '}
                          {(order?.product as TProduct)?.price}
                        </p>
                        <p className="text-gray-700">Qty: {order?.quantity}</p>
                      </div>
                      <p className="text-gray-700 text-end font-semibold">
                        Total: <span className="text-base">৳</span>{' '}
                        {order?.totalPrice}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <OrderTimeline timeline={order?.timeLine || []} />
              </div>

              {/* Order Details */}
              <OrderDetailsCard order={order} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog />
    </>
  );
};

export default ChangeOrderStatusDialog;

import bikeImage from '@/assets/bike-image.png';
import { IOrderData, TProduct } from '@/types/common';
import { format } from 'date-fns';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import ChangeOrderStatusDialog from './change-order-status-dialog';
import OrderDetailsDialog from './order-details-dialog';

interface IProps {
  order: IOrderData;
  showManageOptions?: boolean;
}

const OrderCard = ({ order, showManageOptions }: IProps) => {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showChangeStatusDialog, setShowChangeStatusDialog] = useState(false);

  return (
    <Card className="border rounded-lg shadow-md p-3">
      <CardContent className="flex items-start space-x-4 px-0">
        <img
          src={(order?.product as TProduct)?.image || bikeImage}
          alt={(order?.product as TProduct)?.name || 'Product Image'}
          className="w-20 h-20 object-contain bg-accent rounded-lg cursor-pointer"
          onClick={() => setShowDetailsDialog(true)}
        />

        <div className="flex-1 gap-1">
          <h1
            className="text-xl font-bold text-gray-800 cursor-pointer"
            onClick={() => setShowDetailsDialog(true)}
          >
            {(order?.product as TProduct)?.name}{' '}
            <Badge
              variant={'secondary'}
              className={
                order?.status === 'Cancelled'
                  ? 'bg-red-300 text-red-800'
                  : order?.status === 'Refunded'
                  ? 'bg-pink-200 text-pink-800'
                  : order?.status === 'Shipped'
                  ? 'bg-blue-300 text-blue-800'
                  : order?.status === 'Delivered'
                  ? 'bg-green-300 text-green-800'
                  : order?.status === 'Paid'
                  ? 'bg-amber-300 text-amber-800'
                  : order?.status === 'Processing'
                  ? 'bg-yellow-300 text-yellow-800'
                  : ''
              }
            >
              {order?.status}
            </Badge>
          </h1>

          <div className="flex justify-between gap-2 items-center">
            <p className="text-sm text-gray-600">
              <span className="text-base">৳</span>{' '}
              {(order?.product as TProduct)?.price}
            </p>
            <p className="text-gray-700">Qty: {order.quantity}</p>
          </div>
          <p className="text-gray-700 text-end font-semibold">
            Total: <span className="text-base">৳</span> {order?.totalPrice}
          </p>
          <p className="text-gray-700 text-sm italic text-end">
            <span className="font-semibold"> Ordered at:</span>{' '}
            {format(new Date(order.createdAt), 'dd-MMM-yyyy, hh:mm a')}
          </p>

          {showManageOptions && (
            <div className="grid gap-3 sm:grid-cols-2 mt-2">
              <Button
                variant={'outline'}
                className="font-semibold"
                onClick={() => setShowChangeStatusDialog(true)}
              >
                Change Status
              </Button>
              <Button onClick={() => setShowDetailsDialog(true)}>
                Details
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      {showDetailsDialog && (
        <OrderDetailsDialog
          order={order}
          onClose={(state) => setShowDetailsDialog(state)}
        />
      )}
      {showChangeStatusDialog && (
        <ChangeOrderStatusDialog
          order={order}
          onClose={(state) => setShowChangeStatusDialog(state)}
        />
      )}
    </Card>
  );
};

export default OrderCard;

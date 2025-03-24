import bikeImage from '@/assets/bike-image.png';
import { IOrderData, TProduct } from '@/types/common';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface IProps {
  order: IOrderData;
  showManageOptions?: boolean;
}

const OrderCard = ({ order, showManageOptions }: IProps) => {
  return (
    <Card className="border rounded-lg shadow-md p-3">
      <CardContent className="flex items-start space-x-4 px-0">
        <Link to={`/orders/${order._id}`}>
          <img
            src={(order?.product as TProduct)?.image || bikeImage}
            alt={(order?.product as TProduct)?.name || 'Product Image'}
            className="w-20 h-20 object-contain bg-accent rounded-lg"
          />
        </Link>
        <div className="flex-1 gap-1">
          <Link to={`/orders/${order._id}`}>
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
            Total: <span className="text-base">৳</span> {order?.totalPrice}
          </p>
          <p className="text-gray-700 text-sm italic text-end">
            <span className="font-semibold"> Ordered at:</span>{' '}
            {format(new Date(order.createdAt), 'dd-MMM-yyyy, hh:mm a')}
          </p>

          {showManageOptions && (
            <div className="grid gap-3 sm:grid-cols-2 mt-2">
              <Button variant={'outline'} className="font-semibold">
                Change Status
              </Button>
              <Button asChild>
                <Link to={`/orders/${order._id}`}>Details</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

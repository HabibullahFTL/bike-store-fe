import { IOrderData } from '@/types/common';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

interface IProps {
  order: IOrderData | null;
}

const OrderDetailsCard = ({ order }: IProps) => {
  return (
    <div className="border rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>

      <div>
        <h3 className="text-base font-semibold text-gray-700">Order ID</h3>
        <p className="text-gray-800">{order?._id}</p>
      </div>

      <div className={order?.status === 'Paid' ? 'hidden' : ''}>
        <h3 className="text-base font-semibold text-gray-700">Order status</h3>
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
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-700">
          Payment Method
        </h3>
        <p className="text-gray-800">{order?.transaction?.method || 'N/A'}</p>
      </div>

      <div className={order?.status === 'Refunded' ? 'hidden' : ''}>
        <h3 className="text-base font-semibold text-gray-700">
          Payment Status
        </h3>
        <Badge
          variant={'secondary'}
          className={
            order?.transaction?.payment_status === 'Cancelled'
              ? 'bg-red-300 text-red-800'
              : order?.transaction?.payment_status === 'Refunded'
              ? 'bg-pink-200 text-pink-800'
              : order?.transaction?.payment_status === 'Shipped'
              ? 'bg-blue-300 text-blue-800'
              : order?.transaction?.payment_status === 'Delivered'
              ? 'bg-green-300 text-green-800'
              : order?.transaction?.payment_status === 'Paid'
              ? 'bg-green-300 text-green-800'
              : order?.transaction?.payment_status === 'Processing'
              ? 'bg-yellow-300 text-yellow-800'
              : ''
          }
        >
          {order?.transaction?.payment_status}
        </Badge>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-700">
          Shipping Address
        </h3>
        <p className="text-gray-800">{order?.shippingAddress}</p>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-700">Order Date</h3>
        <p className="text-gray-800">
          {order?.createdAt
            ? format(new Date(order?.createdAt), "dd-MMM-yyyy 'at' hh:mm a")
            : null}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsCard;

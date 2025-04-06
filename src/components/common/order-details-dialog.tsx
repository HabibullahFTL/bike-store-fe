import bikeImage from '@/assets/bike-image.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IOrderData, TProduct } from '@/types/common';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import OrderDetailsCard from './order-details-card';
import OrderTimeline from './order-timeline';

interface IProps {
  order: IOrderData | null;
  onClose: (state: boolean) => void;
}

const OrderDetailsDialog = ({ order, onClose }: IProps) => {
  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>View Order</DialogTitle>
          <DialogDescription className="sr-only">
            Order Details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[68vh] overflow-y-auto">
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
                    alt={(order?.product as TProduct)?.name || 'Product Image'}
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
  );
};

export default OrderDetailsDialog;

import bikeImage from '@/assets/bike-image.png';
import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrderDetailsQuery } from '@/redux/features/orders/ordersApi';
import { TProduct } from '@/types/common';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { orderId } = useParams();

  // Fetch order details
  const {
    data: order,
    isLoading,
    error,
  } = useOrderDetailsQuery({
    orderId: orderId || '',
  });

  if (isLoading) {
    return (
      <Container className="py-10 text-center">
        <p className="text-gray-500 text-lg">Loading order details...</p>
      </Container>
    );
  }

  if (!order || error) {
    return (
      <Container className="py-10 text-center">
        <p className="text-gray-500 text-lg">
          Order not found or an error occurred.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-5 max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <Button className="mt-0 w-full md:w-auto bg-blue-500 hover:bg-blue-600 h-10 !px-10">
        Back to Orders
      </Button>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Product Card */}
        <div className="">
          <Card className="border rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <img
                src={(order?.product as TProduct)?.image || bikeImage}
                alt={(order?.product as TProduct)?.name || 'Product Image'}
                className="w-20 h-20 object-contain bg-accent rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {(order?.product as TProduct)?.name}
                </h1>
                <p className="text-lg text-gray-600">৳{order?.totalPrice}</p>
                <p className="text-gray-700">Quantity: {order.quantity}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div className="border rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Details
          </h2>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Order ID</h3>
            <p className="text-gray-800">{order._id}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Payment Method
            </h3>
            <p className="text-gray-800">
              {order?.transaction?.method || 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Payment Status
            </h3>
            <p
              className={`text-white inline-block px-3 py-1 rounded ${
                order?.transaction?.payment_status === 'Paid'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            >
              {order?.transaction?.payment_status}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Shipping Address
            </h3>
            <p className="text-gray-800">{order?.shippingAddress}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Order Date</h3>
            <p className="text-gray-800">
              {new Date(order?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailsPage;

import { useVerifyPaymentQuery } from '@/redux/features/orders/ordersApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentVerifyPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = params.get('order_id') || '';

  const { data, isLoading, error } = useVerifyPaymentQuery({ transactionId });

  useEffect(() => {
    if (!transactionId) {
      console.log('No order ID found');
      navigate('/orders'); // Redirect if no order ID is found
    }
  }, [transactionId, navigate]);

  useEffect(() => {
    if (data?.transaction?.payment_status == 'Paid') {
      toast.success('Payment successful! Redirecting to your orders...');
      setTimeout(() => {
        navigate(`/orders/${data?._id}`);
      }, 4000);
    } else if (error) {
      toast.error('Payment verification failed! Redirecting to your orders...');
      setTimeout(() => {
        navigate(`/orders/${data?._id}`);
      }, 4000);
    }
  }, [data, error, navigate]);

  if (isLoading) {
    return (
      <div className="text-blue-500 text-center mt-10 flex justify-center items-center h-96 w-full">
        Verifying payment...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold text-center mb-4">
        Payment Verification
      </h2>

      {data?.transaction?.payment_status === 'Paid' ? (
        <div className="text-green-600 text-center font-semibold">
          Payment verified successfully! Redirecting...
        </div>
      ) : (
        <div className="text-red-500 text-center font-semibold">
          Payment verification failed! Redirecting...
        </div>
      )}
    </div>
  );
};

export default PaymentVerifyPage;

import { baseApi } from '@/redux/api/baseApi';
import { IOrderData } from '@/types/common';

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: '/orders',
        method: 'POST',
        body: orderInfo,
      }),
      transformResponse: (response) => {
        return (
          response as unknown as { data: { _id: string; checkoutURL: string } }
        )?.data;
      },
    }),
    orderDetails: builder.query({
      query: (args: { orderId: string }) => ({
        url: `/orders/${args?.orderId}`,
        method: 'GET',
      }),
      providesTags: ['orders'],
      transformResponse: (response) => {
        const result = response as unknown as {
          data: IOrderData;
          success: boolean;
        };
        return result?.data;
      },
    }),
    verifyPayment: builder.query({
      query: (args: { transactionId: string }) => ({
        url: `/orders/verify-payment?transactionId=${args?.transactionId}`,
        method: 'GET',
      }),
      // providesTags: ['orders'],
      transformResponse: (response) => {
        const result = response as unknown as {
          data: IOrderData;
          success: boolean;
        };
        return result?.data;
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentQuery,
  useOrderDetailsQuery,
} = ordersApi;

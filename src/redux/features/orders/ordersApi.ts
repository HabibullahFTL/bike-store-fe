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
    orders: builder.query({
      query: (args: { limit: number; page: number }) => {
        const queryParams = new URLSearchParams();
        queryParams.append('limit', (args?.limit || 10).toString());
        queryParams.append('page', (args?.page || 1).toString());

        return {
          url: `/orders?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['orders'],
      transformResponse: (response) => {
        const result = response as unknown as {
          data: IOrderData[];
          meta: {
            limit: number;
            page: number;
            totalPages: number;
            totalResults: number;
          };
          success: boolean;
        };
        return result;
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
    changeOrderStatus: builder.mutation({
      query: (orderInfo: { id: string; status: string }) => ({
        url: `/orders/update-status/${orderInfo?.id}`,
        method: 'PATCH',
        body: orderInfo,
      }),
      invalidatesTags: ['orders'],
      transformResponse: (response) => {
        const result = response as unknown as {
          success: boolean;
          data: { _id: string; checkoutURL: string };
        };
        return result?.success ? result?.data : undefined;
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentQuery,
  useOrderDetailsQuery,
  useChangeOrderStatusMutation,
  useOrdersQuery,
} = ordersApi;

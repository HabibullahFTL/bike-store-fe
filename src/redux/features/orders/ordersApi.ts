import { baseApi } from '@/redux/api/baseApi';

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
  }),
});

export const { useCreateOrderMutation } = ordersApi;

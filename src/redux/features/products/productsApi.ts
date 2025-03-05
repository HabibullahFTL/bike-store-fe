import { TMeta, TProduct, TQuery } from '@/types/common';
import { baseApi } from '../../api/baseApi';

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args?: TQuery) => {
        const page = args?.page || '1';
        const limit = args?.limit || '10';
        const sortBy = args?.sortBy || 'createdAt';
        const sortOrder = args?.sortOrder || 'desc';
        const searchTerm = args?.searchTerm || '';
        const searchValue = args?.searchValue || '';

        const queryObj = {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
          searchValue,
        };

        const params = new URLSearchParams();
        Object.keys(queryObj)?.forEach((key) => {
          params.append(key, queryObj?.[key as keyof typeof queryObj]);
        });

        return {
          url: '/products',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['products'],
      transformResponse: (response) => {
        const result = response as unknown as { data: TProduct[]; meta: TMeta };
        return {
          data: result.data,
          meta: result.meta,
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;

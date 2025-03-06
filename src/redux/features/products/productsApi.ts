import { TMeta, TProduct, TProductQuery } from '@/types/common';
import { baseApi } from '../../api/baseApi';

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args?: TProductQuery) => {
        const page = (args?.page || '1')?.toString();
        const limit = (args?.limit || '10')?.toString();
        const sortBy = args?.sortBy || 'createdAt';
        const sortOrder = args?.sortOrder || 'desc';
        const search = args?.search || '';
        const category = args?.category || '';
        const brand = args?.brand || '';
        const minPrice = (args?.minPrice || '0')?.toString();
        const maxPrice = (args?.maxPrice || '100000')?.toString();
        const inStock = (args?.inStock || true)?.toString();

        console.log({ inStock });

        const queryObj = {
          page,
          limit,
          sortBy,
          sortOrder,
          search,
          category,
          brand,
          minPrice,
          maxPrice,
          inStock,
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

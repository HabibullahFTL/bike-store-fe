import { baseApi } from '@/redux/api/baseApi';
import { IUserDetails } from '@/types/common';

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: (args: { limit: number; page: number }) => {
        const queryParams = new URLSearchParams();
        queryParams.append('limit', (args?.limit || 10).toString());
        queryParams.append('page', (args?.page || 1).toString());

        return {
          url: `/user?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['users'],
      transformResponse: (response) => {
        const result = response as unknown as {
          data: IUserDetails[];
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
    userDetails: builder.query({
      query: (args: { orderId: string }) => ({
        url: `/user/${args?.orderId}`,
        method: 'GET',
      }),
      providesTags: ['users'],
      transformResponse: (response) => {
        const result = response as unknown as {
          data: IUserDetails;
          success: boolean;
        };
        return result?.data;
      },
    }),
    blockUser: builder.mutation({
      query: (args: { userId: string }) => ({
        url: `/user/block-user/${args?.userId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['users'],
      transformResponse: (response) => {
        const result = response as unknown as {
          success: boolean;
          data: IUserDetails;
        };
        return result?.success ? result?.data : null;
      },
    }),
    unblockUser: builder.mutation({
      query: (args: { userId: string }) => ({
        url: `/user/unblock-user/${args?.userId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['users'],
      transformResponse: (response) => {
        const result = response as unknown as {
          success: boolean;
          data: IUserDetails;
        };
        return result?.success ? result?.data : null;
      },
    }),
    changeRole: builder.mutation({
      query: (args: { userId: string; role: 'admin' | 'customer' }) => ({
        url: `/user/change-role/${args?.userId}`,
        method: 'PATCH',
        body: {
          role: args?.role,
        },
      }),
      invalidatesTags: ['users'],
      transformResponse: (response) => {
        const result = response as unknown as {
          success: boolean;
          data: IUserDetails;
        };
        return result?.success ? result?.data : null;
      },
    }),
  }),
});

export const {
  useUsersQuery,
  useUserDetailsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useChangeRoleMutation,
} = usersApi;

import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (userInfo) => ({
        url: '/user/customer-registration',
        method: 'POST',
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: passwords,
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useChangePasswordMutation,
} = authApi;

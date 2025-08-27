/**
 * Authentication API Endpoints
 * Handles login, logout, session management, and user authentication
 */

import { apiSlice } from '../../index';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Authentication
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
    
    // Profile Management
    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: passwordData,
      }),
    }),
    
    // Password Reset
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, password },
      }),
    }),
    
    // Session Validation
    validateSession: builder.query({
      query: () => '/auth/validate',
      providesTags: ['User'],
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateSessionQuery,
} = authApi;

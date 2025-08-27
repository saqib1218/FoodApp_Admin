/**
 * Customers API Endpoints
 * Customer management and support
 */

import { apiSlice } from '../../index';

export const customersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Customer Management
    getCustomers: builder.query({
      query: (params = {}) => ({
        url: '/admin/customers',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          status: params.status,
          city: params.city,
          registrationDateFrom: params.registrationDateFrom,
          registrationDateTo: params.registrationDateTo,
        }
      }),
      providesTags: ['Customer'],
    }),
    
    getCustomerById: builder.query({
      query: (customerId) => `/admin/customers/${customerId}`,
      providesTags: (result, error, arg) => [{ type: 'Customer', id: arg }],
    }),
    
    updateCustomer: builder.mutation({
      query: ({ id, ...customerData }) => ({
        url: `/admin/customers/${id}`,
        method: 'PUT',
        body: customerData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Customer', id: arg.id }],
    }),
    
    suspendCustomer: builder.mutation({
      query: ({ customerId, reason }) => ({
        url: `/admin/customers/${customerId}/suspend`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Customer', id: arg.customerId }],
    }),
    
    activateCustomer: builder.mutation({
      query: (customerId) => ({
        url: `/admin/customers/${customerId}/activate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Customer', id: arg }],
    }),
    
    // Customer Analytics
    getCustomerStats: builder.query({
      query: (customerId) => `/admin/customers/${customerId}/stats`,
      providesTags: (result, error, arg) => [{ type: 'Customer', id: arg }],
    }),
    
    getCustomerOrderHistory: builder.query({
      query: ({ customerId, ...params }) => ({
        url: `/admin/customers/${customerId}/orders`,
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo,
        }
      }),
      providesTags: (result, error, arg) => [{ type: 'Customer', id: arg.customerId }],
    }),
    
    // Customer Addresses
    getCustomerAddresses: builder.query({
      query: (customerId) => `/admin/customers/${customerId}/addresses`,
      providesTags: (result, error, arg) => [{ type: 'Customer', id: arg }],
    }),
    
    // Customer Support
    getCustomerSupportTickets: builder.query({
      query: ({ customerId, ...params }) => ({
        url: `/admin/customers/${customerId}/support-tickets`,
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
        }
      }),
      providesTags: (result, error, arg) => [{ type: 'Customer', id: arg.customerId }],
    }),
  }),
});

// Export hooks
export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useSuspendCustomerMutation,
  useActivateCustomerMutation,
  useGetCustomerStatsQuery,
  useGetCustomerOrderHistoryQuery,
  useGetCustomerAddressesQuery,
  useGetCustomerSupportTicketsQuery,
} = customersApi;

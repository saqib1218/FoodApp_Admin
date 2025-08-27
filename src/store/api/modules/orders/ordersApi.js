/**
 * Orders API Endpoints
 * Comprehensive order management system
 */

import { apiSlice } from '../../index';

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Order Management
    getOrders: builder.query({
      query: (params = {}) => ({
        url: '/admin/orders',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          status: params.status,
          kitchenId: params.kitchenId,
          customerId: params.customerId,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo,
          paymentStatus: params.paymentStatus,
        }
      }),
      providesTags: ['Order'],
    }),
    
    getOrderById: builder.query({
      query: (orderId) => `/admin/orders/${orderId}`,
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
    
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status, notes }) => ({
        url: `/admin/orders/${orderId}/status`,
        method: 'PUT',
        body: { status, notes },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.orderId }],
    }),
    
    cancelOrder: builder.mutation({
      query: ({ orderId, reason }) => ({
        url: `/admin/orders/${orderId}/cancel`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.orderId }],
    }),
    
    refundOrder: builder.mutation({
      query: ({ orderId, amount, reason }) => ({
        url: `/admin/orders/${orderId}/refund`,
        method: 'POST',
        body: { amount, reason },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.orderId }],
    }),
    
    // Order Analytics
    getOrderAnalytics: builder.query({
      query: (params = {}) => ({
        url: '/admin/orders/analytics',
        params: {
          period: params.period || 'month',
          kitchenId: params.kitchenId,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo,
        }
      }),
      providesTags: ['Analytics'],
    }),
    
    getOrdersByKitchen: builder.query({
      query: ({ kitchenId, ...params }) => ({
        url: `/admin/kitchens/${kitchenId}/orders`,
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo,
        }
      }),
      providesTags: (result, error, arg) => [
        { type: 'Order', id: `kitchen-${arg.kitchenId}` },
        'Order'
      ],
    }),
    
    getOrdersByCustomer: builder.query({
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
      providesTags: (result, error, arg) => [
        { type: 'Order', id: `customer-${arg.customerId}` },
        'Order'
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useRefundOrderMutation,
  useGetOrderAnalyticsQuery,
  useGetOrdersByKitchenQuery,
  useGetOrdersByCustomerQuery,
} = ordersApi;

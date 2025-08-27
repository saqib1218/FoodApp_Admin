/**
 * Discounts API Endpoints
 * Discount and promotion management
 */

import { apiSlice } from '../../index';

export const discountsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Discount Management
    getDiscounts: builder.query({
      query: (params = {}) => ({
        url: '/admin/discounts',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          status: params.status,
          type: params.type,
          kitchenId: params.kitchenId,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo
        }
      }),
      providesTags: ['Discount'],
    }),
    
    getDiscountById: builder.query({
      query: (discountId) => `/admin/discounts/${discountId}`,
      providesTags: (result, error, arg) => [{ type: 'Discount', id: arg }],
    }),
    
    createDiscount: builder.mutation({
      query: (discountData) => ({
        url: '/admin/discounts',
        method: 'POST',
        body: discountData,
      }),
      invalidatesTags: ['Discount'],
    }),
    
    updateDiscount: builder.mutation({
      query: ({ id, ...discountData }) => ({
        url: `/admin/discounts/${id}`,
        method: 'PUT',
        body: discountData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Discount', id: arg.id }],
    }),
    
    deleteDiscount: builder.mutation({
      query: (discountId) => ({
        url: `/admin/discounts/${discountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Discount'],
    }),
    
    activateDiscount: builder.mutation({
      query: (discountId) => ({
        url: `/admin/discounts/${discountId}/activate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Discount', id: arg }],
    }),
    
    deactivateDiscount: builder.mutation({
      query: (discountId) => ({
        url: `/admin/discounts/${discountId}/deactivate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Discount', id: arg }],
    }),
    
    // Discount Analytics
    getDiscountStats: builder.query({
      query: (params = {}) => ({
        url: '/admin/discounts/stats',
        params: {
          period: params.period || 'month',
          discountId: params.discountId,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo
        }
      }),
      providesTags: ['Discount'],
    }),
    
    getDiscountUsage: builder.query({
      query: ({ discountId, ...params }) => ({
        url: `/admin/discounts/${discountId}/usage`,
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo
        }
      }),
      providesTags: (result, error, arg) => [{ type: 'Discount', id: arg.discountId }],
    }),
  }),
});

// Export hooks
export const {
  useGetDiscountsQuery,
  useGetDiscountByIdQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
  useActivateDiscountMutation,
  useDeactivateDiscountMutation,
  useGetDiscountStatsQuery,
  useGetDiscountUsageQuery,
} = discountsApi;

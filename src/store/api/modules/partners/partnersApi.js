/**
 * Partners API Endpoints
 * Partner management and onboarding
 */

import { apiSlice } from '../../index';

export const partnersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Partner Management
    getPartners: builder.query({
      query: (params = {}) => ({
        url: '/admin/partners',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          status: params.status,
          type: params.type,
          city: params.city,
        }
      }),
      providesTags: ['Partner'],
    }),
    
    getPartnerById: builder.query({
      query: (partnerId) => `/admin/partners/${partnerId}`,
      providesTags: (result, error, arg) => [{ type: 'Partner', id: arg }],
    }),
    
    createPartner: builder.mutation({
      query: (partnerData) => ({
        url: '/admin/partners',
        method: 'POST',
        body: partnerData,
      }),
      invalidatesTags: ['Partner'],
    }),
    
    updatePartner: builder.mutation({
      query: ({ id, ...partnerData }) => ({
        url: `/admin/partners/${id}`,
        method: 'PUT',
        body: partnerData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Partner', id: arg.id }],
    }),
    
    deletePartner: builder.mutation({
      query: (partnerId) => ({
        url: `/admin/partners/${partnerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Partner'],
    }),
    
    approvePartner: builder.mutation({
      query: (partnerId) => ({
        url: `/admin/partners/${partnerId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Partner', id: arg }],
    }),
    
    suspendPartner: builder.mutation({
      query: (partnerId) => ({
        url: `/admin/partners/${partnerId}/suspend`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Partner', id: arg }],
    }),
  }),
});

// Export hooks
export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useApprovePartnerMutation,
  useSuspendPartnerMutation,
} = partnersApi;

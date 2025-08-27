/**
 * Users API Endpoints
 * User management, roles, and permissions
 */

import { apiSlice } from '../../index';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // User Management
    getUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),
    
    getUserById: builder.query({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
    
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/admin/users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    
    activateUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/activate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
    
    deactivateUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/deactivate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
    
    // Role Management
    getRoles: builder.query({
      query: () => '/admin/roles',
      providesTags: ['Role'],
    }),
    
    getRoleById: builder.query({
      query: (roleId) => `/admin/roles/by-id/${roleId}`,
      providesTags: (result, error, roleId) => [{ type: 'Role', id: roleId }],
    }),
    
    getPermissionsByUserId: builder.query({
      query: (userId) => `/admin/permissions/by-user/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'UserPermissions', id: userId }],
    }),
    
    createRole: builder.mutation({
      query: (roleData) => ({
        url: '/admin/roles/create',
        method: 'POST',
        body: roleData,
      }),
      invalidatesTags: ['Role'],
    }),
    
    updateRole: builder.mutation({
      query: ({ id, ...roleData }) => ({
        url: `/admin/roles/${id}`,
        method: 'PUT',
        body: roleData,
      }),
      invalidatesTags: ['Role'],
    }),
    
    deleteRole: builder.mutation({
      query: (roleId) => ({
        url: `/admin/roles/${roleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
    
    // Permission Management
    getPermissions: builder.query({
      query: () => '/admin/permissions',
      providesTags: ['Permission'],
    }),
    
    createPermission: builder.mutation({
      query: (permissionData) => ({
        url: '/admin/permissions/create',
        method: 'POST',
        body: permissionData,
      }),
      invalidatesTags: ['Permission'],
    }),
    
    assignUserRole: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: `/admin/users/${userId}/roles`,
        method: 'POST',
        body: { roleId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.userId }],
    }),
    
    removeUserRole: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: `/admin/users/${userId}/roles/${roleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.userId }],
    }),
    
    assignRolePermissions: builder.mutation({
      query: ({ roleId, permissionIds }) => ({
        url: `/admin/roles/${roleId}/permissions`,
        method: 'POST',
        body: { permissionIds },
      }),
      invalidatesTags: ['Role', 'Permission'],
    }),
    
    // User Activity
    getUserActivity: builder.query({
      query: ({ userId, ...params }) => ({
        url: `/admin/users/${userId}/activity`,
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          dateFrom: params.dateFrom,
          dateTo: params.dateTo,
        }
      }),
      providesTags: (result, error, arg) => [{ type: 'User', id: arg.userId }],
    }),
  }),
});

// Export hooks
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useGetPermissionsByUserIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useAssignUserRoleMutation,
  useRemoveUserRoleMutation,
  useAssignRolePermissionsMutation,
  useGetUserActivityQuery,
} = usersApi;

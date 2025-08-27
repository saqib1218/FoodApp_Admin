/**
 * Temporary mock service helpers
 * These are placeholder functions to prevent build errors while migrating to RTK Query
 * TODO: Remove this file once all components are migrated to RTK Query
 */

// Mock kitchen service
export const mockKitchenService = {
  getAllKitchens: async () => {
    console.warn('TODO: Replace with RTK Query useGetKitchensQuery');
    return [];
  },
  getKitchenById: async (id) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenByIdQuery');
    return { id, name: 'Mock Kitchen', status: 'active' };
  },
  getFilterOptions: async () => {
    console.warn('TODO: Replace with RTK Query useGetKitchenFilterOptionsQuery');
    return { cities: [], cuisines: [], statuses: [] };
  },
  filterKitchens: async (filters) => {
    console.warn('TODO: Replace with RTK Query useGetKitchensQuery with params');
    return [];
  },
  updateKitchenStatus: async (id, status, comment) => {
    console.warn('TODO: Replace with RTK Query useUpdateKitchenMutation');
    return { id, status };
  }
};

// Mock kitchen user service
export const mockKitchenUserService = {
  getKitchenUsers: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenUsersQuery');
    return [];
  },
  addKitchenUser: async (kitchenId, userData) => {
    console.warn('TODO: Replace with RTK Query useAddKitchenUserMutation');
    return { id: Date.now(), ...userData };
  },
  updateKitchenUser: async (kitchenId, userId, userData) => {
    console.warn('TODO: Replace with RTK Query useUpdateKitchenUserMutation');
    return { id: userId, ...userData };
  },
  removeKitchenUser: async (kitchenId, userId) => {
    console.warn('TODO: Replace with RTK Query useRemoveKitchenUserMutation');
    return { success: true };
  },
  getUsersByKitchen: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenUsersQuery');
    return [];
  },
  getUserActivity: async (userId) => {
    console.warn('TODO: Replace with RTK Query useGetUserActivityQuery');
    return [];
  },
  updateUserPermissions: async (userId, permissions) => {
    console.warn('TODO: Replace with RTK Query useUpdateUserMutation');
    return { id: userId, permissions };
  },
  updateUserStatus: async (userId, status) => {
    console.warn('TODO: Replace with RTK Query useUpdateUserMutation');
    return { id: userId, status };
  }
};

// Mock kitchen dish service
export const mockKitchenDishService = {
  getKitchenDishes: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenDishesQuery');
    return [];
  },
  getDishById: async (kitchenId, dishId) => {
    console.warn('TODO: Replace with RTK Query useGetDishByIdQuery');
    return { id: dishId, name: 'Mock Dish' };
  },
  getDishCategories: async () => {
    console.warn('TODO: Replace with RTK Query');
    return [];
  },
  updateDish: async (kitchenId, dishId, dishData) => {
    console.warn('TODO: Replace with RTK Query useUpdateDishMutation');
    return { id: dishId, ...dishData };
  },
  deleteDish: async (kitchenId, dishId) => {
    console.warn('TODO: Replace with RTK Query useDeleteDishMutation');
    return { success: true };
  }
};

// Mock kitchen media service
export const mockKitchenMediaService = {
  getKitchenMedia: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenMediaQuery');
    return [];
  }
};

// Mock kitchen address service
export const mockKitchenAddressService = {
  getKitchenAddresses: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenAddressesQuery');
    return [];
  }
};

// Mock kitchen availability service
export const mockKitchenAvailabilityService = {
  getKitchenAvailability: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenAvailabilityQuery');
    return { kitchenId, schedule: [] };
  },
  updateKitchenAvailability: async (kitchenId, availabilityData) => {
    console.warn('TODO: Replace with RTK Query useUpdateKitchenAvailabilityMutation');
    return { kitchenId, ...availabilityData };
  }
};

// Mock kitchen analytics service
export const mockKitchenAnalyticsService = {
  getKitchenAnalytics: async (kitchenId, params) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenAnalyticsQuery');
    return { revenue: 0, orders: 0, customers: 0 };
  },
  getKitchenStats: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenStatsQuery');
    return { totalRevenue: 0, totalOrders: 0 };
  },
  getRevenueAnalytics: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenAnalyticsQuery');
    return { data: [] };
  },
  getOrderAnalytics: async (kitchenId) => {
    console.warn('TODO: Replace with RTK Query useGetKitchenAnalyticsQuery');
    return { data: [] };
  }
};

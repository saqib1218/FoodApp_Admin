/**
 * Centralized API Exports
 * Enterprise-level RTK Query API management
 */

// Import all API modules
export * from './auth/authApi';
export * from './kitchens/kitchensApi';
export * from './orders/ordersApi';
export * from './users/usersApi';
export * from './customers/customersApi';
export * from './partners/partnersApi';
export * from './feedback/feedbackApi';
export * from './discounts/discountsApi';

// Re-export the main API slice
export { default as apiSlice } from '../index';

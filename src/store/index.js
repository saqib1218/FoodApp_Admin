import { configureStore } from '@reduxjs/toolkit';

// Import future slices here
// import kitchenSlice from './slices/kitchenSlice';
import { apiSlice } from './api';
// import orderSlice from './slices/orderSlice';
// import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    // Add slices here as they are created
    api: apiSlice.reducer,
    // kitchen: kitchenSlice,
    // orders: orderSlice,
    // users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// TypeScript type exports removed - not needed in JavaScript
// If you need these types, convert this file to TypeScript (.ts)

export default store;

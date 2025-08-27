import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get API base URL from environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Async thunks for API calls
export const fetchKitchens = createAsyncThunk(
  'kitchen/fetchKitchens',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kitchens`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch kitchens');
    }
  }
);

export const fetchKitchenById = createAsyncThunk(
  'kitchen/fetchKitchenById',
  async (kitchenId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kitchens/${kitchenId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch kitchen');
    }
  }
);

export const updateKitchenStatus = createAsyncThunk(
  'kitchen/updateStatus',
  async ({ kitchenId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/kitchens/${kitchenId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update kitchen status');
    }
  }
);

// Initial state
const initialState = {
  kitchens: [],
  currentKitchen: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

// Kitchen slice
const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    clearCurrentKitchen: (state) => {
      state.currentKitchen = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch kitchens
      .addCase(fetchKitchens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKitchens.fulfilled, (state, action) => {
        state.loading = false;
        state.kitchens = action.payload.kitchens || [];
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchKitchens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch kitchen by ID
      .addCase(fetchKitchenById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKitchenById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentKitchen = action.payload;
      })
      .addCase(fetchKitchenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update kitchen status
      .addCase(updateKitchenStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateKitchenStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update kitchen in list if it exists
        const index = state.kitchens.findIndex(k => k.id === action.payload.id);
        if (index !== -1) {
          state.kitchens[index] = action.payload;
        }
        // Update current kitchen if it matches
        if (state.currentKitchen?.id === action.payload.id) {
          state.currentKitchen = action.payload;
        }
      })
      .addCase(updateKitchenStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentPage, setPageSize, clearCurrentKitchen } = kitchenSlice.actions;

export default kitchenSlice.reducer;

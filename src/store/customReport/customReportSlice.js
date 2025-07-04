import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { customReportService } from '../../services/api/customReportService';

export const fetchCustomReports = createAsyncThunk(
  'customReports/fetchAll',
  async () => {
    const response = await customReportService.getAll();
    return response.entities;
  }
);

export const createCustomReport = createAsyncThunk(
  'customReports/create',
  async (data) => {
    const response = await customReportService.create(data);
    return response.entity;
  }
);

export const updateCustomReport = createAsyncThunk(
  'customReports/update',
  async ({ id, data }) => {
    const response = await customReportService.update(id, data);
    return response.entity;
  }
);

export const deleteCustomReport = createAsyncThunk(
  'customReports/delete',
  async (id) => {
    await customReportService.remove(id);
    return id;
  }
);

const customReportSlice = createSlice({
  name: 'customReports',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomReports.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomReports.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createCustomReport.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCustomReport.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteCustomReport.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default customReportSlice.reducer;
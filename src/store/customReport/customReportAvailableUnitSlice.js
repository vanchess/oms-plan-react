import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customReportUnitsService } from '../../services/api/customReportUnitsService';

export const fetchUnits = createAsyncThunk(
  'customReportUnits/fetchAll',
  async () => {
    const { entities } = await customReportUnitsService.getAll();
    return entities;
  }
);

const customReportAvailableUnitSlice = createSlice({
  name: 'customReportUnits',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customReportAvailableUnitSlice.reducer;
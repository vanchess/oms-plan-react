import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customReportProfileRelationTypeService } from '../../services/api/customReportProfileRelationTypeService';

export const fetchRelationTypes = createAsyncThunk(
  'relationTypes/fetchAll',
  async () => {
    const response = await customReportProfileRelationTypeService.getAll();
    
    return response.entities;
  }
);

const relationTypeSlice = createSlice({
  name: 'relationTypes',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelationTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelationTypes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchRelationTypes.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default relationTypeSlice.reducer;
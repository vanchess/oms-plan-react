import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customReportProfileService } from '../../services/api/customReportProfileService';

export const fetchProfilesByReportId = createAsyncThunk(
  'customReportProfile/fetchByReportId',
  async (reportId) => {
    const { entities } = await customReportProfileService.getByReportId(reportId);
    return entities;
  }
);

export const addProfile = createAsyncThunk(
  'customReportProfile/add',
  async (profileData) => {
    const { entity } = await customReportProfileService.create(profileData);
    return entity;
  }
);

export const updateProfile = createAsyncThunk(
  'customReportProfile/update',
  async ({ id, ...profileData }) => {
    const { entity } = await customReportProfileService.update(id, profileData);
    return entity;
  }
);

export const deleteProfile = createAsyncThunk(
  'customReportProfile/delete',
  async (id) => {
    await customReportProfileService.remove(id);
    return id;
  }
);

const customReportProfileSlice = createSlice({
  name: 'customReportProfile',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilesByReportId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilesByReportId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProfilesByReportId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addProfile.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default customReportProfileSlice.reducer;
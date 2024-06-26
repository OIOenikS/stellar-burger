import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

export const getFeedOrders = createAsyncThunk('feedOrders/getAll', async () => {
  const orders = await getFeedsApi();
  return orders;
});

export interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: ''
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotalFeedOrders: (state) => state.total,
    selectTotalTodayFeedOrders: (state) => state.totalToday,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedOrders.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getFeedOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = `${action.error.message}`;
    });
    builder.addCase(getFeedOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.isLoading = false;
      state.error = '';
    });
  }
});

export const {
  selectFeedOrders,
  selectTotalFeedOrders,
  selectTotalTodayFeedOrders,
  selectIsLoading,
  selectError
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;

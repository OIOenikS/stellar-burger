import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrderFullInfo } from '../utils/types';
import {
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '../utils/burger-api';

export const getOrders = createAsyncThunk('orders/getAll', async () => {
  const orders = await getOrdersApi();
  return orders;
});

export const getOrder = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order.orders;
  }
);

export const orderBurger = createAsyncThunk(
  'order/createОrderBurger',
  async (ingredientsArray: string[]) => {
    const order = await orderBurgerApi(ingredientsArray);
    return order;
  }
);

export interface IOrdersState {
  orders: TOrder[];
  orderData: TOrder;
  orderModalData: TOrderFullInfo | null;
  isLoading: boolean;
  error: string;
}

export const initialState: IOrdersState = {
  orders: [],
  orderData: {
    _id: '',
    ingredients: [],
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0
  },
  orderModalData: null,
  isLoading: false,
  error: ''
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeModalAfterOrderingBurger: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderData: (state) => state.orderData,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = `${action.error.message}`;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.orders = action.payload;
    });

    builder.addCase(orderBurger.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.isLoading = false;
      state.error = `${action.error.message}`;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.orderModalData = action.payload.order;
    });

    builder.addCase(getOrder.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = `${action.error.message}`;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.orderData = action.payload[0];
    });
  }
});

export const {
  selectOrders,
  selectOrderModalData,
  selectOrderData,
  selectIsLoading,
  selectError
} = ordersSlice.selectors;

export const { closeModalAfterOrderingBurger } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;

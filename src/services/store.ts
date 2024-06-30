import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../features/ingredientsSlice';
import { feedReducer } from '../features/feedSlice';
import { burgerConstructorReducer } from '../features/burgerConstructorSlice';
import { userReducer } from '../features/userSlice';
import { ordersReducer } from '../features/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  burger: burgerConstructorReducer,
  user: userReducer,
  orders: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

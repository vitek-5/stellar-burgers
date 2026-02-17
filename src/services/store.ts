import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  userReducer,
  ordersReducer,
  ingredientsReducer,
  constructorReducer
} from '@slices';

export const rootReducer = combineReducers({
  constructorSlice: constructorReducer,
  user: userReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

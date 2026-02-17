import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrdersState = {
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
    isLoading: boolean;
    error: string | null;
  };
  user: {
    orders: TOrder[];
    newOrder: TOrder | null;
    showModal: boolean;
    isLoading: boolean;
    error: string | null;
  };
  orderInfo: {
    currentOrder: TOrder | null;
    isLoading: boolean;
    error: string | null;
  };
};

const initialState: TOrdersState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  },
  user: {
    orders: [],
    newOrder: null,
    showModal: false,
    isLoading: false,
    error: null
  },
  orderInfo: {
    currentOrder: null,
    isLoading: false,
    error: null
  }
};

export const getFeedsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getFeedsApi>>,
  void,
  { rejectValue: string }
>('feeds/getAllFeeds', async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка загрузки ленты заказов');
  }
});

export const getOrderByNumberThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getOrderByNumberApi>>,
  number,
  { rejectValue: string }
>('orders/getOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    return await getOrderByNumberApi(number);
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка загрузки заказа');
  }
});

export const getUserOrdersThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getOrdersApi>>,
  void,
  { rejectValue: string }
>('orders/getOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка загрузки ваших заказов');
  }
});

export const postUserOrderThunk = createAsyncThunk<
  Awaited<ReturnType<typeof orderBurgerApi>>,
  string[],
  { rejectValue: string }
>('orders/postNewOrder', async (data, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(data);
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка создания заказа');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.user.showModal = action.payload;
    }
  },
  selectors: {
    // Лента заказов
    selectFeedOrders: (state) => state.feed.orders,
    selectFeedTotal: (state) => state.feed.total,
    selectFeedTotalToday: (state) => state.feed.totalToday,
    selectIsFeedLoading: (state) => state.feed.isLoading,
    selectFeedError: (state) => state.feed.error,

    // Заказы пользователя
    selectNewOrder: (state) => state.user.newOrder,
    selectUserOrders: (state) => state.user.orders,
    selectNewOrderLoading: (state) => state.user.isLoading,
    selectNewOrderError: (state) => state.user.error,
    selectShowModal: (state) => state.user.showModal,

    // Детали заказа (любого)
    selectCurrentOrder: (state) => state.orderInfo.currentOrder,
    selectIsOrderInfoLoading: (state) => state.orderInfo.isLoading,
    selectOrderInfoError: (state) => state.orderInfo.error
  },
  extraReducers: (builder) => {
    builder
      // Лента заказов
      .addCase(getFeedsThunk.pending, (state) => {
        state.feed.isLoading = true;
        state.feed.orders = [];
        state.feed.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.feed.isLoading = false;
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.feed.isLoading = false;
        state.feed.error = action.payload || 'Непредвиденная ошибка';
      })
      // Лента заказов пользователя
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.user.isLoading = true;
        state.user.error = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.user.isLoading = false;
        state.user.orders = action.payload;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.error = action.payload || 'Непредвиденная ошибка';
      })

      // Новый заказ
      .addCase(postUserOrderThunk.pending, (state) => {
        state.user.isLoading = true;
        state.user.newOrder = null;
        state.user.showModal = true;
        state.user.error = null;
      })
      .addCase(postUserOrderThunk.fulfilled, (state, action) => {
        state.user.isLoading = false;
        state.user.newOrder = action.payload.order;
      })
      .addCase(postUserOrderThunk.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.error = action.payload || 'Непредвиденная ошибка';
      })

      // Детали заказа
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderInfo.isLoading = true;
        state.orderInfo.currentOrder = null;
        state.orderInfo.error = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderInfo.isLoading = false;
        state.orderInfo.currentOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.orderInfo.isLoading = false;
        state.orderInfo.error = action.payload || 'Непредвиденная ошибка';
      });
  }
});
export const ordersReducer = ordersSlice.reducer;

export const { setShowModal } = ordersSlice.actions;

export const {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectIsFeedLoading,
  selectFeedError,
  selectNewOrder,
  selectUserOrders,
  selectNewOrderLoading,
  selectShowModal,
  selectCurrentOrder,
  selectIsOrderInfoLoading,
  selectOrderInfoError
} = ordersSlice.selectors;

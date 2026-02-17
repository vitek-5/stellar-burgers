jest.mock('@cookie', () => ({
  getCookie: jest.fn()
}));

import { TFeedsResponse, TNewOrderResponse, TOrderResponse } from '@api';
import { getCookie } from '@cookie';
import { configureStore } from '@reduxjs/toolkit';
import {
  getFeedsThunk,
  getOrderByNumberThunk,
  getUserOrdersThunk,
  ordersReducer,
  postUserOrderThunk,
  TOrdersState
} from '@slices';

const mockFeeds = {
  orders: [
    {
      _id: '698f1cfea64177001b32baf9',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Spicy люминесцентный краторный бургер',
      createdAt: '2026-02-13T12:45:50.730Z',
      updatedAt: '2026-02-13T12:45:50.950Z',
      number: 100915
    },
    {
      _id: '698e3818a64177001b32ba04',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Метеоритный space краторный бессмертный люминесцентный бургер',
      createdAt: '2026-02-12T20:29:12.291Z',
      updatedAt: '2026-02-12T20:29:12.493Z',
      number: 100887
    },
    {
      _id: '698df686a64177001b32b9b0',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Био-марсианский флюоресцентный люминесцентный бургер',
      createdAt: '2026-02-12T15:49:26.956Z',
      updatedAt: '2026-02-12T15:49:27.172Z',
      number: 100876
    },
    {
      _id: '698df300a64177001b32b9a4',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Люминесцентный краторный бургер',
      createdAt: '2026-02-12T15:34:24.492Z',
      updatedAt: '2026-02-12T15:34:24.701Z',
      number: 100875
    }
  ],
  total: 500,
  totalToday: 25
};

const mockOrderInfo = {
  orders: [
    {
      _id: '698e8886a64177001b32ba73',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Метеоритный био-марсианский люминесцентный краторный бургер',
      createdAt: '2026-02-13T02:12:22.003Z',
      updatedAt: '2026-02-13T02:12:22.235Z',
      number: 100898
    }
  ]
};

const mockNewOrder = {
  order: {
    _id: '698e8886a64177001b32ba73',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Метеоритный био-марсианский люминесцентный краторный бургер',
    createdAt: '2026-02-13T02:12:22.003Z',
    updatedAt: '2026-02-13T02:12:22.235Z',
    number: 100898
  }
};

const orderData: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0940',
  '643d69a5c3f7b9001cfa093f',
  '643d69a5c3f7b9001cfa093e',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa0943',
  '643d69a5c3f7b9001cfa093c'
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('ordersSlice: Тесты редюсеров', () => {
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
  // getFeedsThunk
  describe('[getFeedsThunk]', () => {
    it('pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = ordersReducer(initialState, action);
      const feed = state.feed;
      expect(feed.isLoading).toBe(true);
      expect(feed.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: { ...mockFeeds, success: true }
      };
      const state = ordersReducer(initialState, action);
      const feed = state.feed;
      expect(feed.isLoading).toBe(false);
      expect(feed.error).toBeNull();
      expect(feed.orders).toEqual(mockFeeds.orders);
      expect(feed.total).toEqual(mockFeeds.total);
      expect(feed.totalToday).toEqual(mockFeeds.totalToday);
    });

    it('rejected', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = ordersReducer(initialState, action);
      const feed = state.feed;
      expect(feed.isLoading).toBe(false);
      expect(feed.error).toBe('Тестовая ошибка');
    });
  });
  // getOrderByNumberThunk
  describe('[getOrderByNumberThunk]', () => {
    it('pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = ordersReducer(initialState, action);
      const order = state.orderInfo;
      expect(order.isLoading).toBe(true);
      expect(order.error).toBeNull();
      expect(order.currentOrder).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: { ...mockOrderInfo, success: true }
      };
      const state = ordersReducer(initialState, action);
      const order = state.orderInfo;
      expect(order.isLoading).toBe(false);
      expect(order.error).toBeNull();
      expect(order.currentOrder).toEqual(mockOrderInfo.orders[0]);
    });

    it('rejected', () => {
      const action = {
        type: getOrderByNumberThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = ordersReducer(initialState, action);
      const order = state.orderInfo;
      expect(order.isLoading).toBe(false);
      expect(order.error).toBe('Тестовая ошибка');
    });
  });
  // getUserOrdersThunk
  describe('[getUserOrdersThunk]', () => {
    it('pending', () => {
      const action = { type: getUserOrdersThunk.pending.type };
      const state = ordersReducer(initialState, action);
      const order = state.user;
      expect(order.isLoading).toBe(true);
      expect(order.error).toBeNull();
    });

    it('fulfilled', () => {
      const action = {
        type: getUserOrdersThunk.fulfilled.type,
        payload: mockFeeds.orders
      };
      const state = ordersReducer(initialState, action);
      const order = state.user;
      expect(order.isLoading).toBe(false);
      expect(order.error).toBeNull();
      expect(order.orders).toEqual(mockFeeds.orders);
    });

    it('rejected', () => {
      const action = {
        type: getUserOrdersThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = ordersReducer(initialState, action);
      const order = state.user;
      expect(order.isLoading).toBe(false);
      expect(order.error).toBe('Тестовая ошибка');
    });
  });
  //postUserOrderThunk
  describe('[postUserOrderThunk]', () => {
    it('pending', () => {
      const action = { type: postUserOrderThunk.pending.type };
      const state = ordersReducer(initialState, action);
      const order = state.user;
      expect(order.isLoading).toBe(true);
      expect(order.error).toBeNull();
      expect(order.newOrder).toBeNull();
      expect(order.showModal).toBe(true);
    });

    it('fulfilled', () => {
      const action = {
        type: postUserOrderThunk.fulfilled.type,
        payload: { success: true, name: 'string', ...mockNewOrder }
      };
      const state = ordersReducer(initialState, action);
      const order = state.user;
      expect(order.isLoading).toBe(false);
      expect(order.error).toBeNull();
      expect(order.newOrder).toEqual(mockNewOrder.order);
    });

    it('rejected', () => {
      const action = {
        type: postUserOrderThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = ordersReducer(initialState, action);
      const order = state.user;
      expect(order.isLoading).toBe(false);
      expect(order.error).toBe('Тестовая ошибка');
    });
  });
});

describe('ordersSlice: API тесты', () => {
  //getFeedsThunk
  describe('[getFeedsThunk]', () => {
    it('success', async () => {
      const mockApiResponse: TFeedsResponse = {
        success: true,
        ...mockFeeds
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { orders: ordersReducer }
      });
      await store.dispatch(getFeedsThunk());
      const state = store.getState().orders.feed;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockFeeds.orders);
      expect(state.total).toEqual(mockFeeds.total);
      expect(state.totalToday).toEqual(mockFeeds.totalToday);
    });

    it('error', async () => {
      const mockError = 'API ошибка';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({
        reducer: { orders: ordersReducer }
      });
      await store.dispatch(getFeedsThunk());
      const state = store.getState().orders.feed;

      expect(state.error).toBe(mockError);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });
  });
  //getOrderByNumberThunk
  describe('[getOrderByNumberThunk]', () => {
    it('success', async () => {
      const mockApiResponse: TOrderResponse = {
        success: true,
        ...mockOrderInfo
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { orders: ordersReducer }
      });
      await store.dispatch(getOrderByNumberThunk(100898));
      const state = store.getState().orders.orderInfo;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.currentOrder).toEqual(mockOrderInfo.orders[0]);
    });

    it('error', async () => {
      const mockError = 'API ошибка';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({
        reducer: { orders: ordersReducer }
      });
      await store.dispatch(getOrderByNumberThunk(100898));
      const state = store.getState().orders.orderInfo;

      expect(state.error).toBe(mockError);
      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toBeNull();
    });
  });
  //postUserOrderThunk
  describe('[postUserOrderThunk]', () => {
    beforeEach(() => {
      (getCookie as jest.Mock).mockReturnValue('fake-access-token');
    });
    it('success', async () => {
      const mockApiResponse: TNewOrderResponse = {
        success: true,
        order: mockNewOrder.order,
        name: 'postNewOrder'
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { orders: ordersReducer }
      });
      await store.dispatch(postUserOrderThunk(orderData));
      const state = store.getState().orders.user;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.newOrder).toEqual(mockNewOrder.order);
      expect(state.showModal).toBe(true);
      expect(getCookie).toHaveBeenCalledWith('accessToken');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/orders'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            authorization: 'fake-access-token'
          }),
          body: JSON.stringify({ ingredients: orderData })
        })
      );
    });

    it('error', async () => {
      const mockError = 'API ошибка';

      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({
        reducer: { orders: ordersReducer }
      });
      await store.dispatch(postUserOrderThunk(orderData));
      const state = store.getState().orders.user;

      expect(state.error).toBe(mockError);
      expect(state.isLoading).toBe(false);
      expect(state.newOrder).toBeNull();
      expect(state.showModal).toBe(true);
      expect(getCookie).toHaveBeenCalledWith('accessToken');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/orders'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            authorization: 'fake-access-token'
          }),
          body: JSON.stringify({ ingredients: orderData })
        })
      );
    });
  });
});

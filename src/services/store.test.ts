import { rootReducer } from './store';

const initialState = {
  constructorSlice: {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  },
  user: {
    user: null,
    isLoading: false
  },
  orders: {
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
  },
  ingredients: {
    ingredients: [],
    isLoading: false,
    error: null
  }
};

describe('rootReducer', () => {
  it('Должно возвращаться начальное состояние при неизвестном экшене и состоянии стейта', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = rootReducer(undefined, unknownAction);
    expect(result).toEqual(initialState);
  });
});

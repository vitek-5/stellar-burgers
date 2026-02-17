jest.mock('@cookie', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

import { TAuthResponse, TLoginData, TRegisterData } from '@api';
import { deleteCookie, getCookie, setCookie } from '@cookie';
import { configureStore } from '@reduxjs/toolkit';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  TUserState,
  updateUserThunk,
  userReducer
} from '@slices';

const loginData: TLoginData = {
  email: 'abra@cedavra.com',
  password: 'abracedavra123'
};

const registerData: TRegisterData = {
  email: 'abra@cedavra.com',
  name: 'Bond, James Bond',
  password: 'abracedavra123'
};

const mockAuthData: TAuthResponse = {
  success: true,
  refreshToken: 'fake-refresh-token',
  accessToken: 'fake-access-token',
  user: { email: 'abra@cedavra.com', name: 'Bond, James Bond' }
};

afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
});

describe('userSlice: Тесты редюсеров', () => {
  const initialState: TUserState = {
    user: null,
    isLoading: false,
    error: undefined
  };

  // registerUserThunk
  describe('[registerUserThunk]', () => {
    it('pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('fulfilled', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: mockAuthData
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.user).toEqual(mockAuthData.user);
    });

    it('rejected', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Тестовая ошибка');
    });
  });

  // loginUserThunk
  describe('[loginUserThunk]', () => {
    it('pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('fulfilled', () => {
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: mockAuthData
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.user).toEqual(mockAuthData.user);
    });

    it('rejected', () => {
      const action = {
        type: loginUserThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Тестовая ошибка');
    });
  });

  // logoutUserThunk
  describe('[logoutUserThunk]', () => {
    it('pending', () => {
      const action = { type: logoutUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('fulfilled', () => {
      const action = { type: logoutUserThunk.fulfilled.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.user).toBeNull();
    });

    it('rejected', () => {
      const action = {
        type: logoutUserThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Тестовая ошибка');
    });
  });

  // updateUserThunk
  describe('[updateUserThunk]', () => {
    it('pending', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('fulfilled', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: mockAuthData
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.user).toEqual(mockAuthData.user);
    });

    it('rejected', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Тестовая ошибка');
    });
  });

  // getUserThunk
  describe('[getUserThunk]', () => {
    it('pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('fulfilled', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: mockAuthData
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.user).toEqual(mockAuthData.user);
    });

    it('rejected', () => {
      const action = {
        type: getUserThunk.rejected.type,
        payload: 'Тестовая ошибка'
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Тестовая ошибка');
    });
  });
});

describe('userSlice: API тесты', () => {
  beforeEach(() => {
    (getCookie as jest.Mock).mockReturnValue('fake-access-token');
    (setCookie as jest.Mock).mockImplementation();
    (deleteCookie as jest.Mock).mockImplementation();
  });

  // registerUserThunk
  describe('[registerUserThunk]', () => {
    it('success', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthData)
        })
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(registerUserThunk(registerData));
      const state = store.getState().user;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.user).toEqual(mockAuthData.user);

      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockAuthData.accessToken
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockAuthData.refreshToken
      );
    });

    it('error', async () => {
      const mockError = 'Registration failed';
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(registerUserThunk(registerData));
      const state = store.getState().user;

      expect(state.error).toBe(mockError);
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  // loginUserThunk
  describe('[loginUserThunk]', () => {
    it('success', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthData)
        })
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(loginUserThunk(loginData));
      const state = store.getState().user;

      expect(state.user).toEqual(mockAuthData.user);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockAuthData.accessToken
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockAuthData.refreshToken
      );
    });

    it('error', async () => {
      const mockError = 'Login failed';
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(loginUserThunk(loginData));
      const state = store.getState().user;

      expect(state.error).toBe(mockError);
    });
  });

  // logoutUserThunk
  describe('[logoutUserThunk]', () => {
    it('success', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        })
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(logoutUserThunk());
      const state = store.getState().user;

      expect(state.user).toBeNull();
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken');
    });

    it('error', async () => {
      const mockError = 'Logout failed';
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(logoutUserThunk());
      const state = store.getState().user;

      expect(state.error).toBe(mockError);
    });
  });

  // getUserThunk
  describe('[getUserThunk]', () => {
    it('success', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthData)
        })
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(getUserThunk());
      const state = store.getState().user;

      expect(state.user).toEqual(mockAuthData.user);
    });

    it('error', async () => {
      const mockError = 'Get user failed';
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(getUserThunk());
      const state = store.getState().user;

      expect(state.error).toBe(mockError);
    });
  });

  // updateUserThunk
  describe('[updateUserThunk]', () => {
    it('success', async () => {
      const updateData = { name: 'New Name' };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthData)
        })
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(updateUserThunk(updateData));
      const state = store.getState().user;

      expect(state.user).toEqual(mockAuthData.user);
    });

    it('error', async () => {
      const mockError = 'Update failed';
      global.fetch = jest.fn(() =>
        Promise.reject(new Error(mockError))
      ) as jest.Mock;

      const store = configureStore({ reducer: { user: userReducer } });
      await store.dispatch(updateUserThunk({ name: 'New Name' }));
      const state = store.getState().user;

      expect(state.error).toBe(mockError);
    });
  });
});

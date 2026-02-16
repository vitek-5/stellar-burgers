import {
  forgotPasswordApi,
  loginUserApi,
  logoutApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi,
  registerUserApi,
  getUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '@cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error?: string;
};

const initialState: TUserState = {
  user: null,
  isLoading: false
};

export const registerUserThunk = createAsyncThunk<
  Awaited<ReturnType<typeof registerUserApi>>,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка регистрации');
  }
});

export const loginUserThunk = createAsyncThunk<
  Awaited<ReturnType<typeof loginUserApi>>,
  TLoginData,
  { rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка входа');
  }
});

export const logoutUserThunk = createAsyncThunk<
  Awaited<ReturnType<typeof logoutApi>>,
  void,
  { rejectValue: string }
>('user/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return res;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка выхода');
  }
});

export const updateUserThunk = createAsyncThunk<
  Awaited<ReturnType<typeof updateUserApi>>,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/update', async (user, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(user);
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка обновления профиля');
  }
});

export const forgotPasswordThunk = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>('user/forgotPassword', async (data, { rejectWithValue }) => {
  try {
    await forgotPasswordApi(data);
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка восстановления пароля');
  }
});

export const resetPasswordThunk = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>('user/resetPassword', async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data);
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Ошибка сброса пароля');
  }
});

export const getUserThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getUserApi>>, // ← правильный тип возвращаемого значения
  void,
  { rejectValue: string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserApi();
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(
      error.message || 'Ошибка получения данных пользователя'
    );
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsUserLoading: (state) => state.isLoading,
    selectUserError: (state) => state.error,
    selectIsAuth: (state) => !!state.user
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Непредвиденная ошибка';
      })

      // Авторизация
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Непредвиденная ошибка';
      })

      // Выход
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Непредвиденная ошибка';
      })

      // Обновление данных
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Непредвиденная ошибка';
      })

      // Обновление данных
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Непредвиденная ошибка';
      });
  }
});

export const userReducer = userSlice.reducer;

export const {
  selectUser,
  selectIsUserLoading,
  selectUserError,
  selectIsAuth
} = userSlice.selectors;

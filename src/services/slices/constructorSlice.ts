import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    // Добавить ингредиент (с автоматической генерацией id)
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } as TConstructorIngredient };
      }
    },

    // Удалить ингредиент по id
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ing) => ing.id !== action.payload
        );
    },

    // Очистить конструктор
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems
  }
});

export const constructorReducer = constructorSlice.reducer;

// Экспорт экшенов
export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;

// Экспорт селекторов
export const { selectConstructorItems } = constructorSlice.selectors;

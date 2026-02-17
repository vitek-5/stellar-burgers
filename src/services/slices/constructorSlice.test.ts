import {
  addIngredient,
  constructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  TConstructorState
} from '@slices';

describe('constructorSlice', () => {
  const initialState: TConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  describe('Добавление/удаление ингредиентов в Store', () => {
    const sauceIngredient = {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    const bunIngredient = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    it('[addIngredient] проверка добавления ингредиента в Store', () => {
      const action = addIngredient(sauceIngredient);
      const state = constructorReducer(initialState, action);
      const ingredient = state.constructorItems.ingredients[0];
      expect(ingredient).not.toBe([]);
      const ingredientID = ingredient.id;

      expect(state.constructorItems).toEqual({
        bun: null,
        ingredients: [{ ...sauceIngredient, id: ingredientID }]
      });
    });

    it('[addIngredient] проверка добавления булки в State', () => {
      const action = addIngredient(bunIngredient);
      const state = constructorReducer(initialState, action);
      const bun = state.constructorItems.bun;
      expect(bun).not.toBeNull();

      const bunID = state.constructorItems.bun?.id;

      expect(state.constructorItems).toEqual({
        bun: { ...bunIngredient, id: bunID },
        ingredients: []
      });
    });
    it('[removeIngredient] проверка удаления ингредиента из State', () => {
      const addAction = addIngredient(sauceIngredient);
      const stateWithIngredients = constructorReducer(initialState, addAction);
      const ingredientID =
        stateWithIngredients.constructorItems.ingredients[0].id;

      const removeAction = removeIngredient(ingredientID);
      const expectedState = constructorReducer(
        stateWithIngredients,
        removeAction
      );

      expect(expectedState).toEqual(initialState); // проверяем, что State пуст
    });
  });
  describe('Перемещение ингредиентов', () => {
    const filledState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            id: '1',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            id: '2',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0942',
            id: '3',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0943',
            id: '4',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          }
        ]
      }
    };
    const removedState: TConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            id: '1',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0942',
            id: '3',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            id: '2',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0943',
            id: '4',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          }
        ]
      }
    };

    it('[moveIngredientUp] проверка перемещения ингредиента наверх', () => {
      const moveUpAction = moveIngredientUp(2);
      const stateWithMovedIngredients = constructorReducer(
        filledState,
        moveUpAction
      );
      expect(stateWithMovedIngredients).toEqual(removedState);
    });

    it('[moveIngredientUp] проверка невозможности перемещения ингредиента наверх', () => {
      const moveUpAction = moveIngredientUp(0);
      const stateWithMovedIngredients = constructorReducer(
        filledState,
        moveUpAction
      );
      expect(stateWithMovedIngredients).toEqual(filledState);
    });

    it('[moveIngredientDown] проверка перемещения ингредиента вниз', () => {
      const moveDownAction = moveIngredientDown(1);
      const stateWithMovedIngredients = constructorReducer(
        filledState,
        moveDownAction
      );
      expect(stateWithMovedIngredients).toEqual(removedState);
    });

    it('[moveIngredientDown] проверка невозможности перемещения ингредиента вниз', () => {
      const moveDownAction = moveIngredientDown(3);
      const stateWithMovedIngredients = constructorReducer(
        filledState,
        moveDownAction
      );
      expect(stateWithMovedIngredients).toEqual(filledState);
    });
  });
});

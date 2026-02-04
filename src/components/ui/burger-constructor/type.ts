import { TConstructorIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  showModal: boolean;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};

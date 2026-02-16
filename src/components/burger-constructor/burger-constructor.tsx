import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  postUserOrderThunk,
  selectConstructorItems,
  selectIsAuth,
  selectNewOrder,
  selectNewOrderLoading,
  selectShowModal,
  setShowModal
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectNewOrderLoading);
  const showModal = useSelector(selectShowModal);
  const orderModalData = useSelector(selectNewOrder);

  const onOrderClick = async () => {
    if (
      !constructorItems.bun ||
      constructorItems.ingredients.length === 0 ||
      orderRequest
    )
      return;
    if (!isAuth) {
      return navigate('/login', { replace: true });
    }
    if (isAuth) {
      const orderData = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id
      ];
      await dispatch(postUserOrderThunk(orderData));
      dispatch(clearConstructor());
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(setShowModal(false));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      showModal={showModal}
    />
  );
};

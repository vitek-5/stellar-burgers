import {
  getUserOrdersThunk,
  selectIsUserLoading,
  selectUserOrders
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectUserOrders);
  const isLoading = useSelector(selectIsUserLoading);
  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};

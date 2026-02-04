import { getFeedsThunk, selectFeedOrders } from '@slices';
import { useSelector, useDispatch } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };
  const orders: TOrder[] = useSelector(selectFeedOrders);

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

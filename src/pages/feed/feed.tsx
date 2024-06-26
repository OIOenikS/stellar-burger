import { Preloader } from '@ui';
import { ErrorMessage } from '@components';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import { useEffect } from 'react';
import { getFeedOrders } from '../../features/feedSlice';
import {
  selectFeedOrders,
  selectError,
  selectIsLoading
} from '../../features/feedSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isFeedLoading = useSelector(selectIsLoading);
  const feedErrorMessage = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedOrders());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeedOrders());
  };

  if (isFeedLoading) {
    return <Preloader />;
  }

  if (feedErrorMessage) {
    return <ErrorMessage error={feedErrorMessage} />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

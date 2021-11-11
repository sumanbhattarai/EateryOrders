import React, {useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';

import styles from './styles';
import OrderCard from 'components/OrderCard';
import {useAppSelector, useAppDispatch} from 'services/TypedRedux';
import {getOrder} from 'store/slices/order';
import {OrderStatus, RequestStatus} from 'store/utils';
import {hp} from 'utils/Constants';
import Empty from 'components/Empty';

const InReview = () => {
  const {status, entities, ids} = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const isLoading = status === RequestStatus.Pending;
  const inReviewIds = ids.filter(
    (el) => entities[el]?.status === OrderStatus.InReview,
  );

  useEffect(() => {
    dispatch(getOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentLoader
      loading={isLoading && ids.length < 1}
      listSize={6}
      pRows={1}
      pHeight={hp(14)}
      pWidth={'100%'}
      tHeight={0}
      animationDuration={1000}
      containerStyles={styles.cardContainer}>
      <FlatList
        data={inReviewIds}
        keyExtractor={(item, index) => `${entities[item]?._id}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && ids.length > 0}
            onRefresh={() => dispatch(getOrder())}
          />
        }
        renderItem={({item}) => <OrderCard id={item} />}
        ListEmptyComponent={() => <Empty />}
      />
    </ContentLoader>
  );
};

export default InReview;

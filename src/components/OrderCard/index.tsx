import React, {useMemo} from 'react';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {EntityId} from '@reduxjs/toolkit';

import styles from './styles';
import Text from 'components/Text';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';
import {useAppDispatch, useAppSelector} from 'services/TypedRedux';
import {IOrder} from 'api/utils';
import {updateOrderStatus} from 'store/slices/order';
import {OrderStatus, RequestStatus} from 'store/utils';

interface Props {
  id: EntityId;
}

const OrderCard = ({id}: Props) => {
  const {entities, individualOrderStatus} = useAppSelector(
    (state) => state.order,
  );
  const {entities: foodEntities} = useAppSelector((state) => state.menu);
  const {
    customerName,
    customerAddress,
    customerPhone,
    cartTotalItems,
    status,
    date,
    totalCost,
  } = entities[id] as IOrder;
  const dispatch = useAppDispatch();
  const showButtons =
    status === (OrderStatus.InReview || OrderStatus.Confirmed);

  const cartItems = useMemo(
    () =>
      cartTotalItems.map((el) => {
        const foodDetails = foodEntities[el._id];
        return {
          name: foodDetails?.name,
          quantity: el.quantity,
        };
      }),
    [cartTotalItems, foodEntities],
  );

  const handleClick = (action: 'accept' | 'reject') => {
    Alert.alert(
      `Are you sure you want to move the order to ${
        action === 'reject'
          ? 'spam'
          : status === OrderStatus.InReview
          ? 'confirmed'
          : 'delivered'
      } section?`,
      '',
      [
        {
          text: 'Ok',
          onPress: () => {
            const statusParam: OrderStatus =
              action === 'reject'
                ? OrderStatus.Rejected
                : status === OrderStatus.InReview
                ? OrderStatus.Confirmed
                : OrderStatus.Delivered;
            dispatch(updateOrderStatus({id, status: statusParam}));
          },
        },
        {
          text: 'Cancel',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalView}>
        <Text type="sub-heading">{customerName}</Text>
        <Text type="tiny">{date}</Text>
      </View>
      <Text>
        Phone: <Text type="tiny">{customerPhone}</Text>
      </Text>
      <Text>
        Location: <Text type="tiny">{customerAddress}</Text>
      </Text>
      <Text>
        Total Cost: <Text type="tiny">Rs. {totalCost}</Text>
      </Text>
      <View style={styles.table}>
        <View style={styles.horizontalView}>
          <View style={styles.border}>
            <Text>Item</Text>
          </View>
          <View style={styles.border}>
            <Text>Quantity</Text>
          </View>
        </View>
        {cartItems.map((el, index) => (
          <View style={styles.horizontalView} key={index}>
            <View style={styles.border}>
              <Text type="tiny">{el.name}</Text>
            </View>
            <View style={styles.border}>
              <Text type="tiny">{el.quantity}</Text>
            </View>
          </View>
        ))}
      </View>
      {showButtons && (
        <View style={styles.buttonView}>
          <Button
            style={{backgroundColor: Colors.success}}
            onPress={() => handleClick('accept')}
            loading={individualOrderStatus[id] === RequestStatus.Pending}
            needsInternet>
            <Icon name="check" color={Colors.white} size={wp(4)} />
          </Button>
          <Button
            style={{backgroundColor: Colors.error}}
            onPress={() => handleClick('reject')}
            needsInternet
            loading={individualOrderStatus[id] === RequestStatus.Pending}>
            <Icon name="close" color={Colors.white} size={wp(4)} />
          </Button>
        </View>
      )}
    </View>
  );
};

export default OrderCard;

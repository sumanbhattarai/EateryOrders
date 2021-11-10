import React, {useMemo} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import Text from 'components/Text';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';
import {useAppSelector} from 'services/TypedRedux';
import {EntityId} from '@reduxjs/toolkit';
import {IOrder} from 'api/utils';

interface Props {
  id: EntityId;
}

const OrderCard = ({id}: Props) => {
  const {entities} = useAppSelector((state) => state.order);
  const {entities: foodEntities} = useAppSelector((state) => state.menu);
  const {
    customerName,
    customerAddress,
    customerPhone,
    cartTotalItems,
  } = entities[id] as IOrder;

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

  return (
    <View style={styles.container}>
      <View style={styles.horizontalView}>
        <Text type="sub-heading">{customerName}</Text>
        <Text type="tiny">{moment().format('MMMM Do YYYY HH:MM:SS a')}</Text>
      </View>
      <Text>
        Phone: <Text type="tiny">{customerPhone}</Text>
      </Text>
      <Text>
        Location: <Text type="tiny">{customerAddress}</Text>
      </Text>
      <Text>
        Total Cost: <Text type="tiny">Rs. 4537</Text>
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
      <View style={styles.buttonView}>
        <Button
          style={{backgroundColor: Colors.success}}
          onPress={() => {}}
          needsInternet>
          <Icon name="check" color={Colors.white} size={wp(4)} />
        </Button>
        <Button
          style={{backgroundColor: Colors.error}}
          onPress={() => {}}
          needsInternet>
          <Icon name="close" color={Colors.white} size={wp(4)} />
        </Button>
      </View>
    </View>
  );
};

export default OrderCard;

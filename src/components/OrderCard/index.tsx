import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import Text from 'components/Text';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';

const orderedItem = [
  {name: 'Chicken Momo', quantity: 1},
  {name: 'Buff Sekuwa', quantity: 2},
  {name: 'Buff Chhoila', quantity: 2},
  {name: 'Biryani', quantity: 3},
];

const OrderCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontalView}>
        <Text type="sub-heading">Abiral Bhattarai</Text>
        <Text type="tiny">{moment().format('MMMM Do YYYY HH:MM:SS a')}</Text>
      </View>
      <Text>
        Phone: <Text type="tiny">+977-9845696211</Text>
      </Text>
      <Text>
        Location: <Text type="tiny">GCES, Lamachaur, Kaski</Text>
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
        {orderedItem.map((el, index) => (
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

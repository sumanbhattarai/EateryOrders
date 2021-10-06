import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import Text from 'components/Text';
import {useAppSelector} from 'services/TypedRedux';

interface Props {
  id: string;
}

const FoodCard = ({id}: Props) => {
  const {entities} = useAppSelector((state) => state.menu);
  const {name, category, price} = entities[id]!;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
      <View style={styles.container}>
        <View>
          <Image
            source={require('assets/images/pizza.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.detail}>
          <View style={styles.detailRow}>
            <Text type="sub-heading">{name}</Text>
            <Text style={styles.rating}>
              <Icon name="star" size={16} /> 5.0
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.price}>Rs. {price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

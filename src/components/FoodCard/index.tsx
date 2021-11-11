import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import Text from 'components/Text';
import {useAppSelector} from 'services/TypedRedux';
import {RootStackParamList} from 'navigators/utils';
import Colors from 'utils/Colors';

interface Props {
  id: string;
}

type navigationType = StackNavigationProp<RootStackParamList>;

const FoodCard = ({id}: Props) => {
  const {entities} = useAppSelector((state) => state.menu);
  const {name, category, price, rating, photo} = entities[id]!;
  const navigation = useNavigation<navigationType>();

  const handleNavigation = () => {
    navigation.navigate('FoodDetail', {id: id, name});
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleNavigation}>
      <View style={styles.container}>
        <View>
          <FastImage
            // source={require('assets/images/pizza.png')}
            source={{uri: photo}}
            style={styles.image}
          />
        </View>
        <View style={styles.detail}>
          <View style={styles.detailRow}>
            <Text type="sub-heading">{name}</Text>
            <Text style={styles.rating}>
              <Icon name="star" size={16} color={Colors.primary} />{' '}
              {Number(rating || '0').toFixed(2)}
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

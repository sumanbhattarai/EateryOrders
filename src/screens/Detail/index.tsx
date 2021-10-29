import React from 'react';
import {View, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import {useAppSelector} from 'services/TypedRedux';
import {RootStackParamList} from 'navigators/utils';

interface Props {
  route: RouteProp<RootStackParamList, 'FoodDetail'>;
}

const Detail = ({route}: Props) => {
  const {entities} = useAppSelector((state) => state.menu);
  const id = route.params.id;
  const {name, category, price} = entities[id]!;
  return (
    <View>
      <Text>{name}</Text>
      <Text>{category}</Text>
      <Text>{price}</Text>
    </View>
  );
};

export default Detail;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import Button from 'components/Button';
import {BottomTabParamList, RootStackParamList} from 'navigators/utils';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<BottomTabParamList>
  >;
}

const Menu = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Menu Screen</Text>
      <Button title="Add Food" onPress={() => navigation.navigate('AddFood')} />
      <Button
        title="Food Detail"
        onPress={() => navigation.navigate('FoodDetal')}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

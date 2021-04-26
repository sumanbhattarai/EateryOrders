import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import Button from 'components/Button';
import {BottomTabParamList, RootStackParamList} from 'navigators/utils';
import {useAppDispatch} from 'services/TypedRedux';
import {fetchCategory} from 'store/slices/category';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<BottomTabParamList>
  >;
}

const Menu = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const loadAppDataAsync = useCallback(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    loadAppDataAsync();
  }, [loadAppDataAsync]);

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

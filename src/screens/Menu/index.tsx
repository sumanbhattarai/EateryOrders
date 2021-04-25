import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from 'components/Button';

const Menu = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Menu Screen</Text>
      <Button
        title="Add Food"
        onPress={() => navigation.navigate('Add new food')}
      />
      <Button
        title="Food Detail"
        onPress={() => navigation.navigate('Food Detail')}
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

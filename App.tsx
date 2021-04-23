import React from 'react';
import {View, StyleSheet} from 'react-native';

import Text from 'components/Text';

const App = () => {
  return (
    <View style={styles.container}>
      <Text type="heading">Eatery Orders</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

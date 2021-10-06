import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from 'components/Text';
import {hp} from 'utils/Constants';

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
  },
});

const getGreeting = (): string => {
  const today = new Date();
  const currentTime = today.getHours();
  if (currentTime < 12) {
    return 'Good morning';
  } else if (currentTime < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const Greeting = () => {
  const greeting: string = getGreeting();
  return (
    <View style={styles.container}>
      <Text type="heading">{greeting}, Admin!</Text>
    </View>
  );
};

export default Greeting;

import React from 'react';
import {View} from 'react-native';

import Text from 'components/Text';

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
    <View>
      <Text type="heading">{greeting}, Admin!</Text>
    </View>
  );
};

export default Greeting;

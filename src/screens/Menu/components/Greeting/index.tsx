import React, {memo} from 'react';
import moment from 'moment';

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
    <>
      <Text type="heading">{greeting.toUpperCase()}, ADMIN!</Text>
      <Text type="tiny">{moment().format('MMMM Do YYYY')}</Text>
    </>
  );
};

export default memo(Greeting);

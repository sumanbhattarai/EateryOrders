import React from 'react';
import FlashMessage from 'react-native-flash-message';

import MainFlow from 'screens/';

const App = () => {
  return (
    <>
      <MainFlow />
      <FlashMessage />
    </>
  );
};

export default App;

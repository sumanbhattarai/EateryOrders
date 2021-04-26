import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';

import MainFlow from 'screens/';
import {store} from 'store/';

const App = () => {
  return (
    <Provider store={store}>
      <MainFlow />
      <FlashMessage />
    </Provider>
  );
};

export default App;

import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainFlow from 'screens/';
import {store} from 'store/';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainFlow />
        <FlashMessage />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

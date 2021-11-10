import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import MainFlow from 'screens/';
import {persistor, store} from 'store/';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainFlow />
          <FlashMessage />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

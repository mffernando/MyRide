import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { store, persistor } from './src/store';

const Test = () => {
  return (
    <SafeAreaView>
      <Text>Test 1,2,3</Text>
    </SafeAreaView>
  );
}

export default () => (
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor} >
      <Test />
    </PersistGate>
  </Provider>
)
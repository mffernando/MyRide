import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

//main screen
import MainStack from './src/navigators/MainStack';

//store
import { store, persistor } from './src/store';

export default () => (
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor} >
      <MainStack />
    </PersistGate>
  </Provider>
)
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

//Reducers
import Reducers from './reducers/index';

const persistedReducer = persistReducer({
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'] //reducer
}, Reducers);

//Store
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
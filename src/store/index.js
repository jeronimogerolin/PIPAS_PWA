import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './ducks';

const middlewares = [];

const persistConfig = {
  key: 'pipas',
  storage: AsyncStorage,
  whitelist: ['auth', 'block', 'basicHealthUnit', 'questionnaries', 'currentUBS'],
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };

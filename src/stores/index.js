import {applyMiddleware, createStore} from 'redux';
import rootReducer from 'stores/root-reducer';
import * as reduxStorage from 'redux-storage';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import saga from 'stores/root-saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'common', 'company', 'user'],
  blackList: ['form']
};

const reducer = reduxStorage.reducer(rootReducer);

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);

sagaMiddleware.run(saga);

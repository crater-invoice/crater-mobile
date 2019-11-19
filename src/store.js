import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers";
import * as reduxStorage from 'redux-storage';
import createSagaMiddleware from 'redux-saga';
import sagas from './saga';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'nav', 'settings', 'global', 'more'],
    blackList: ['form'],
};

const reducer = reduxStorage.reducer(rootReducer);

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);

sagaMiddleware.run(sagas);

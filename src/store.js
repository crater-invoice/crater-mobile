import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import * as reduxStorage from 'redux-storage';
import createSagaMiddleware from 'redux-saga';
import sagas from './saga';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'nav', 'settings', 'global', 'more'],
    blackList: ['form']
};

const reducer = reduxStorage.reducer(rootReducer);

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
const navigationMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav
);
const middleware = [sagaMiddleware, navigationMiddleware];

export const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
);

export const persistor = persistStore(store);

sagaMiddleware.run(sagas);

/* globals window */
/* eslint-disable global-require */
import * as R from 'ramda';
import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { CookieStorage } from 'redux-persist-cookie-storage';
import { reducers } from './reducers';

const composeEnhancers = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const generateRootReducer = () => combineReducers(reducers);

const baseConfigureStore = (initialState, rootReducer) => createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

const basePersistConfig = {
  key: 'checkout',
  whitelist: ['customer', 'order'],
};

export const configureStore = (initialState = {}, { isServer, persistedState }) => {
  if (isServer) {
    const rootReducer = generateRootReducer();
    const store = baseConfigureStore(R.mergeRight(initialState, persistedState), rootReducer);

    return store;
  }

  const { persistStore, persistReducer } = require('redux-persist');
  const Cookies = require('cookies-js');

  const persistConfig = {
    ...basePersistConfig,
    storage: new CookieStorage(Cookies),
  };

  const rootReducer = persistReducer(persistConfig, generateRootReducer());
  const store = baseConfigureStore(initialState, rootReducer);
  store.persistor = persistStore(store);

  return store;
};

export const retrievePersistedState = async ({ req, res }) => {
  let persistedState = {};

  if (req && res) {
    const { getStoredState } = require('redux-persist');
    const { NodeCookiesWrapper } = require('redux-persist-cookie-storage');
    const Cookies = require('cookies');
    const cookieJar = new NodeCookiesWrapper(new Cookies(req, res));

    const persistConfig = {
      ...basePersistConfig,
      storage: new CookieStorage(cookieJar),
    };

    try {
      persistedState = await getStoredState(persistConfig);
      delete persistedState._persist; // eslint-disable-line no-underscore-dangle
    } catch (e) {
      // getStoredState implementation fails when index storage item is not set.
    }
  }

  return persistedState;
};

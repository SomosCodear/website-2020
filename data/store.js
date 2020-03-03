/* globals window */
/* eslint-disable global-require */
import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
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

export function configureStore(initialState = {}, { isServer }) {
  if (isServer) {
    const rootReducer = generateRootReducer();
    const store = baseConfigureStore(initialState, rootReducer);

    return store;
  }

  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'nextjs',
    whitelist: ['order'],
    storage,
  };

  const rootReducer = persistReducer(persistConfig, generateRootReducer());
  const store = baseConfigureStore(initialState, rootReducer);
  store.persistor = persistStore(store);

  return store;
}

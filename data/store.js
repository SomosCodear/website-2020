import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

export function configureStore(initialState = {}) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk),
  );

  return store;
}

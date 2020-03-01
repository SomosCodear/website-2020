import { combineReducers } from 'redux';

const byIdDefault = {};
const byId = (state = byIdDefault) => state;

export const items = combineReducers({
  byId,
});

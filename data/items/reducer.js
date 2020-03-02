import R from 'ramda';
import { combineReducers } from 'redux';
import { ITEMS_FETCH_SUCCESS } from './actionTypes';

const byIdDefault = {};
const byId = (state = byIdDefault, { type, payload }) => {
  switch (type) {
    case ITEMS_FETCH_SUCCESS:
      return R.indexBy(R.prop('id'), payload);
    default:
      return state;
  }
};

export const items = combineReducers({
  byId,
});

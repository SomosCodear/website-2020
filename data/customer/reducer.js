import R from 'ramda';
import { combineReducers } from 'redux';
import {
  CUSTOMER_SET_DATA,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAILURE,
} from './actionTypes';

// eslint-disable-next-line no-underscore-dangle
const _customer = (state = null, { type, payload }) => {
  switch (type) {
    case CUSTOMER_SET_DATA:
    case CUSTOMER_CREATE_SUCCESS:
      return R.mergeLeft(payload)(state);
    default:
      return state;
  }
};

const creating = (state = false, { type }) => {
  switch (type) {
    case CUSTOMER_CREATE_REQUEST:
      return true;
    case CUSTOMER_CREATE_SUCCESS:
    case CUSTOMER_CREATE_FAILURE:
      return false;
    default:
      return state;
  }
};

export const customer = combineReducers({
  customer: _customer,
  creating,
});

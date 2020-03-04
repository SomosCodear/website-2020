import R from 'ramda';
import { combineReducers } from 'redux';
import { CUSTOMER_SET_DATA } from './actionTypes';

const defaultCustomer = {};
// eslint-disable-next-line no-underscore-dangle
const _customer = (state = defaultCustomer, { type, payload }) => {
  switch (type) {
    case CUSTOMER_SET_DATA:
      return R.mergeLeft(payload)(state);
    default:
      return state;
  }
};

export const customer = combineReducers({
  customer: _customer,
});

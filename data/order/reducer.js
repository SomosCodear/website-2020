import R from 'ramda';
import { combineReducers } from 'redux';
import { ORDER_SET_PASS_INFO, ORDER_SET_ADDON_AMOUNT, ORDER_SET_CUSTOMER } from './actionTypes';

const defaultPassHolder = {
  firstName: '',
  lastName: '',
  identityDocument: '',
  email: '',
  item: null,
};
const defaultPassHolders = [defaultPassHolder];
const passHolders = (state = defaultPassHolders, { type, payload }) => {
  switch (type) {
    case ORDER_SET_PASS_INFO:
      return R.adjust(payload.index, R.mergeLeft(payload.value))(state);
    default:
      return state;
  }
};

const defaultAddons = {};
const addons = (state = defaultAddons, { type, payload }) => {
  switch (type) {
    case ORDER_SET_ADDON_AMOUNT:
      return R.compose(
        R.reject(R.equals(0)),
        R.assoc(payload.id, payload.amount),
      )(state);
    default:
      return state;
  }
};

const defaultCustomer = {};
const customer = (state = defaultCustomer, { type, payload }) => {
  switch (type) {
    case ORDER_SET_CUSTOMER:
      return payload;
    default:
      return state;
  }
};

export const order = combineReducers({
  passHolders,
  addons,
  customer,
});

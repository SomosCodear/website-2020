import R from 'ramda';
import { combineReducers } from 'redux';
import {
  ORDER_SET_PASS_INFO,
  ORDER_SET_ADDON_AMOUNT,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
} from './actionTypes';

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

const processing = (state = false, { type }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return true;
    case ORDER_CREATE_SUCCESS:
    case ORDER_SET_PASS_INFO:
      return false;
    default:
      return state;
  }
};

const defaultProcessedOrder = null;
// eslint-disable-next-line no-underscore-dangle
const processedOrder = (state = defaultProcessedOrder, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return defaultProcessedOrder;
    case ORDER_CREATE_SUCCESS:
      return payload;
    default:
      return state;
  }
};

export const order = combineReducers({
  passHolders,
  addons,
  processing,
  processedOrder,
});

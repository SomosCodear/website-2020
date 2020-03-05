import R from 'ramda';
import { api, ORDER } from '../api';
import { createCustomer } from '../customer/actions';
import { getCustomer } from '../customer/selectors';
import { getItemOption } from '../items/selectors';
import { getPassHolders, getAddons } from './selectors';
import {
  ORDER_SET_PASS_INFO,
  ORDER_SET_ADDON_AMOUNT,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
} from './actionTypes';

export const setOrderPassInfo = (index, value) => ({
  type: ORDER_SET_PASS_INFO,
  payload: {
    index,
    value,
  },
});

export const setOrderAddonAmount = (id, amount) => ({
  type: ORDER_SET_ADDON_AMOUNT,
  payload: {
    id,
    amount,
  },
});

const orderCreateRequest = () => ({
  type: ORDER_CREATE_REQUEST,
});

const orderCreateSuccess = (order) => ({
  type: ORDER_CREATE_SUCCESS,
  payload: order,
});

const orderCreateFailure = (error) => ({
  type: ORDER_CREATE_FAILURE,
  payload: error,
});

export const createOrder = () => async (dispatch, getState) => {
  dispatch(orderCreateRequest());

  await dispatch(createCustomer());

  const state = getState();
  const customer = getCustomer(state);

  if (customer.id == null) {
    return;
  }

  const passHolders = getPassHolders(state);
  const addons = getAddons(state);
  const passData = passHolders.map(({
    item,
    ...options
  }) => ({
    item,
    options: R.compose(
      R.values,
      R.mapObjIndexed((value, optionName) => ({
        itemOption: getItemOption(state, item, optionName).id,
        value,
      })),
    )(options),
  }));
  const addonsData = R.compose(
    R.values,
    R.mapObjIndexed((amount, item) => ({ amount, item })),
  )(addons);
  const data = {
    orderItems: [
      ...passData,
      ...addonsData,
    ],
  };

  try {
    const order = api.create(ORDER, data, {
      headers: {
        Authorization: `Customer ${customer.email} ${customer.identityDocument}`,
      },
    });
    dispatch(orderCreateSuccess(order));
  } catch (e) {
    dispatch(orderCreateFailure(e.message));
  }
};

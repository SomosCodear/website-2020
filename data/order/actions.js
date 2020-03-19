/* globals window */
import R from 'ramda';
import { captureException } from '@sentry/browser';
import { api, ORDER } from '../api';
import { createCustomer, setCustomerData } from '../customer/actions';
import { getCustomer } from '../customer/selectors';
import { ITEM_TYPE_PASS } from '../items/constants';
import { getItemsByType, getItemOption } from '../items/selectors';
import { getPassHolders, getAddons } from './selectors';
import {
  ORDER_ADD_PASS,
  ORDER_REMOVE_PASS,
  ORDER_SET_PASS_INFO,
  ORDER_SET_ADDON_AMOUNT,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
} from './actionTypes';
import { buildPaymentURL } from './utils';

export const addOrderPass = () => ({
  type: ORDER_ADD_PASS,
});

export const removeOrderPass = (index) => ({
  type: ORDER_REMOVE_PASS,
  payload: index,
});

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

export const setOrderPassInfoWithDefaultItem = (index, value) => (dispatch, getState) => {
  const state = getState();
  const { id: defaultItemId } = R.head(getItemsByType(state, ITEM_TYPE_PASS));

  dispatch(setOrderPassInfo(index, {
    item: defaultItemId,
    ...value,
  }));
};

export const createOrder = () => async (dispatch, getState) => {
  dispatch(orderCreateRequest());

  await dispatch(createCustomer());

  const state = getState();
  const customer = getCustomer(state);

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
    backUrls: {
      success: `${window.location.origin}/checkout/success`,
      pending: `${window.location.origin}/checkout/pending`,
      failure: `${window.location.origin}/checkout/failure`,
    },
  };

  try {
    const order = await api.create(ORDER, data, {
      headers: {
        Authorization: `Customer ${customer.email} ${customer.identityDocument}`,
      },
    });
    dispatch(orderCreateSuccess(order));
    dispatch(setCustomerData(null));

    window.location = buildPaymentURL(order.preferenceId);
  } catch (e) {
    dispatch(orderCreateFailure(e.message));
    captureException(e);
  }
};

import R from 'ramda';
import { api, CUSTOMER } from '../api';
import { getCustomer } from './selectors';
import {
  CUSTOMER_SET_DATA,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAILURE,
} from './actionTypes';

export const setCustomerData = (customer) => ({
  type: CUSTOMER_SET_DATA,
  payload: customer,
});

const customerCreateRequest = () => ({
  type: CUSTOMER_CREATE_REQUEST,
});

const customerCreateSuccess = (customer) => ({
  type: CUSTOMER_CREATE_SUCCESS,
  payload: customer,
});

const customerCreateFailure = (error) => ({
  type: CUSTOMER_CREATE_FAILURE,
  payload: error,
});

export const createCustomer = () => async (dispatch, getState) => {
  dispatch(customerCreateRequest());
  const data = R.compose(
    R.pick(['email', 'firstName', 'identityDocument']),
    getCustomer,
  )(getState());

  try {
    const customer = await api.create(CUSTOMER, data);
    const relevantCustomerData = R.pick(['id', 'email', 'firstName', 'identityDocument'], customer);

    dispatch(customerCreateSuccess(relevantCustomerData));
  } catch (e) {
    dispatch(customerCreateFailure(e.message));
  }
};

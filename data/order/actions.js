import { ORDER_SET_PASS_INFO, ORDER_SET_ADDON_AMOUNT, ORDER_SET_CUSTOMER } from './actionTypes';

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

export const setOrderCustomer = (customer) => ({
  type: ORDER_SET_CUSTOMER,
  payload: customer,
});

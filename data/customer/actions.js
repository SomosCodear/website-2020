import { CUSTOMER_SET_DATA } from './actionTypes';

export const setCustomerData = (customer) => ({
  type: CUSTOMER_SET_DATA,
  payload: customer,
});

import R from 'ramda';
import { createSelector } from 'reselect';

const getCustomerData = (state) => state.customer;
export const getCustomer = createSelector(
  [getCustomerData],
  R.prop('customer'),
);

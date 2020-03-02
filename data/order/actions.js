import { ORDER_SET_PASS_INFO } from './actionTypes';

export const setOrderPassInfo = (index, value) => ({
  type: ORDER_SET_PASS_INFO,
  payload: {
    index,
    value,
  },
});

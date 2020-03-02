import R from 'ramda';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

export const getOrder = (state) => state.order;
export const getPassHolders = createSelector(
  [getOrder],
  R.prop('passHolders'),
);
export const getPassHolder = createCachedSelector(
  [R.nthArg(1), getPassHolders],
  R.nth,
)(R.nthArg((1)));

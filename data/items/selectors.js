import R from 'ramda';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getItemsState = (state) => state.items;
export const getItemsById = createSelector(
  [getItemsState],
  R.prop('byId'),
);
export const getItemPrice = createCachedSelector(
  [R.nthArg(1), getItemsById],
  R.compose(
    (price) => parseInt(price, 10),
    R.prop('price'),
    R.prop,
  ),
)(R.nthArg(1));

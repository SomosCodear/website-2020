import R from 'ramda';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const getItemsState = (state) => state.items;

export const getItemsById = createSelector(
  [getItemsState],
  R.prop('byId'),
);

const getItemsIndexedByType = createSelector(
  [getItemsById],
  R.compose(
    R.groupBy(R.prop('type')),
    R.values,
  ),
);
export const getItemsByType = createCachedSelector(
  [R.nthArg(1), getItemsIndexedByType],
  R.compose(
    R.defaultTo([]),
    R.prop,
  ),
)(R.nthArg(1));

export const getItemPrice = createCachedSelector(
  [R.nthArg(1), getItemsById],
  R.compose(
    (price) => parseInt(price, 10),
    R.prop('price'),
    R.prop,
  ),
)(R.nthArg(1));

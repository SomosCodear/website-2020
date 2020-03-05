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

export const getItem = createCachedSelector(
  [R.nthArg(1), getItemsById],
  R.prop,
)(R.nthArg(1));

export const getItemPrice = createCachedSelector(
  [getItem],
  R.compose(
    (price) => parseInt(price, 10),
    R.prop('price'),
  ),
)(R.nthArg(1));

export const getItemOptions = createCachedSelector(
  [getItem],
  R.prop('options'),
)(R.nthArg(1));

export const getItemOption = createCachedSelector(
  [R.nthArg(2), getItemOptions],
  (name, options) => R.find(R.propEq('name', name))(options),
)((_, id, optionName) => `${id}:${optionName}`);

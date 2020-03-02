import R from 'ramda';
import { createSelector } from 'reselect';

const getItemsState = (state) => state.items;
export const getItemsById = createSelector(
  [getItemsState],
  R.prop('byId'),
);
export const getItems = createSelector(
  [getItemsById],
  R.values,
);

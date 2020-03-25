import R from 'ramda';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { passHolderSchema } from './schemas';

export const getNewOrder = (state) => state.order.newOrder;

export const getNewOrderPassHolders = createSelector(
  [getNewOrder],
  R.prop('passHolders'),
);
export const getNewOrderFirstInvalidPassholder = createSelector(
  [getNewOrderPassHolders],
  R.compose(
    R.indexOf(false),
    R.map(R.bind(passHolderSchema.isValidSync, passHolderSchema)),
  ),
);
export const areNewOrderPassHoldersValid = createSelector(
  [getNewOrderFirstInvalidPassholder],
  R.equals(-1),
);
export const getNewOrderPassHolder = createCachedSelector(
  [R.nthArg(1), getNewOrderPassHolders],
  R.nth,
)(R.nthArg((1)));
export const getNewOrderPasses = createSelector(
  [getNewOrderPassHolders],
  R.compose(
    R.map(R.length),
    R.groupBy(R.prop('item')),
  ),
);
export const getNewOrderPassHolderNames = createSelector(
  [getNewOrderPassHolders],
  R.map(R.compose(
    R.join(' '),
    R.props(['firstName', 'lastName']),
  )),
);

export const getNewOrderAddons = createSelector(
  [getNewOrder],
  R.prop('addons'),
);

export const isProcessingNewOrder = createSelector(
  [getNewOrder],
  R.prop('processing'),
);

export const getNewOrderCreationError = createSelector(
  [getNewOrder],
  R.prop('error'),
);

export const hasNewOrderCreationError = createSelector(
  [getNewOrderCreationError],
  R.complement(R.isNil),
);

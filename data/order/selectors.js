import R from 'ramda';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { passHolderSchema } from './schemas';

export const getOrder = (state) => state.order;

export const getPassHolders = createSelector(
  [getOrder],
  R.prop('passHolders'),
);
export const getFirstInvalidPassholder = createSelector(
  [getPassHolders],
  R.compose(
    R.indexOf(false),
    R.map(R.bind(passHolderSchema.isValidSync, passHolderSchema)),
  ),
);
export const arePassHoldersValid = createSelector(
  [getFirstInvalidPassholder],
  R.equals(-1),
);
export const getPassHolder = createCachedSelector(
  [R.nthArg(1), getPassHolders],
  R.nth,
)(R.nthArg((1)));
export const getOrderPasses = createSelector(
  [getPassHolders],
  R.compose(
    R.map(R.length),
    R.groupBy(R.prop('item')),
  ),
);
export const getOrderPassHolderNames = createSelector(
  [getPassHolders],
  R.map(R.compose(
    R.join(' '),
    R.props(['firstName', 'lastName']),
  )),
);

export const getAddons = createSelector(
  [getOrder],
  R.prop('addons'),
);

export const isProcessingOrder = createSelector(
  [getOrder],
  R.prop('processing'),
);

export const getProcessedOrder = createSelector(
  [getOrder],
  R.prop('processedOrder'),
);

export const isOrderProcessed = createSelector(
  [getProcessedOrder],
  R.compose(
    R.not,
    R.isNil,
  ),
);

export const getProcessedOrderPreferenceId = createSelector(
  [getProcessedOrder],
  R.prop('preferenceId'),
);

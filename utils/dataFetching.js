import R from 'ramda';
import { fetchItems } from '../data/items/actions';
import { getItemsById } from '../data/items/selectors';

export const conditionallyFetchItems = async (store, isServer) => {
  const itemsById = getItemsById(store.getState());

  if (R.isEmpty(itemsById)) {
    const promise = store.dispatch(fetchItems());

    if (isServer) {
      await promise;
    }
  }

  return {};
};

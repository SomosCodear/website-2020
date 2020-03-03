import { api } from '../api';
import { ITEMS_FETCH_REQUEST, ITEMS_FETCH_SUCCESS, ITEMS_FETCH_FAILURE } from './actionTypes';

const itemsFetchRequest = () => ({
  type: ITEMS_FETCH_REQUEST,
});

const itemsFetchSuccess = (items) => ({
  type: ITEMS_FETCH_SUCCESS,
  payload: items,
});

const itemsFetchFailure = (error) => ({
  type: ITEMS_FETCH_FAILURE,
  payload: error,
});

export const fetchItems = () => async (dispatch) => {
  dispatch(itemsFetchRequest());

  try {
    const items = await api.findAll('items', { include: ['options'] });
    dispatch(itemsFetchSuccess(items));
  } catch (e) {
    dispatch(itemsFetchFailure(e.message));
  }
};

import * as types from './actionTypes';

export const fetchStart = () => ({
  type: types.FETCH_REQUEST,
});
export const fetchSuccess = (products) => ({
  type: types.FETCH_SUCCESS,
  payload: products,
});
export const fetchFail = (error) => ({
  type: types.FETCH_FAIL,
  payload: error,
});

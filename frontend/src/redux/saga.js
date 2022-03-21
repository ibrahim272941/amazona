import axios from 'axios';
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFail, fetchSuccess } from './actions';
import * as types from './actionTypes';

export function* fetchDataAsync({ payload }) {
  try {
    const products = axios.get('/api/products');
    axios.get('/api/products').then((val) => fetchSuccess(val));
    yield put(fetchSuccess(products));
    // const products = yield new Promise((resolve) =>
    //   axios.get('/api/products', resolve)
    // );
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchData() {
  yield takeLatest(types.FETCH_REQUEST, fetchDataAsync);
}
const productSaga = [fork(onFetchData)];
export default function* rootSaga() {
  yield all([...productSaga]);
}

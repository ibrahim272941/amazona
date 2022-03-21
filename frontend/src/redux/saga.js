import axios from 'axios';
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFail, fetchProduct, fetchSuccess } from './actions';
import * as types from './actionTypes';

export function* fetchDataAsync() {
  try {
    const products = yield call(async function () {
      return await axios.get('/api/products');
    });

    yield put(fetchSuccess(products.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchData() {
  yield takeLatest(types.FETCH_REQUEST, fetchDataAsync);
}
export function* fetchProductAsync({ payload }) {
  try {
    const products = yield call(async function () {
      return await axios.get(`/api/products/slug/${payload}`);
    });

    yield put(fetchProduct(products.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchProductData() {
  yield takeLatest(types.FETCH_PRODUCT, fetchProductAsync);
}
const productSaga = [fork(onFetchData), fork(onFetchProductData)];
export default function* rootSaga() {
  yield all([...productSaga]);
}

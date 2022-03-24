import axios from 'axios';
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import {
  cartAddSucces,
  cartAddFail,
  fetchFail,
  fetchProduct,
  fetchSuccess,
} from './actions';
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
export function* fetchProductAsync(payload) {
  const slug = payload.payload;

  try {
    const products = yield call(async function () {
      return await axios.get(`/api/products/slug/${slug}`);
    });

    yield put(fetchProduct(products.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchProductData() {
  yield takeLatest(types.FETCH_PRODUCT, fetchProductAsync);
}
export function* addToCartAsync({ payload }) {
  try {
    yield put(cartAddSucces(payload));
  } catch (error) {
    cartAddFail(error);
  }
}
export function* onAddToCart() {
  yield takeLatest(types.CARD_ADD_ITEM_START, addToCartAsync);
}
const productSaga = [
  fork(onFetchData),
  fork(onFetchProductData),
  fork(onAddToCart),
];
export default function* rootSaga() {
  yield all([...productSaga]);
}

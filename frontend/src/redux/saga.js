import axios from 'axios';
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';

import {
  cartAddSucces,
  cartAddFail,
  fetchFail,
  fetchProduct,
  fetchSuccess,
  cartRemoveStart,
  cartRemoveSuccess,
  fetchProductSucces,
  userSigninSuccess,
  userSigninFail,
} from './actions';
import * as types from './actionTypes';

export function* fetchDataAsync() {
  // const userRef = ref(database, `PVEGcGLnQGaXlK1ISXPm2BOVBTy1/product`);
  // const data = yield new Promise((resolve) => onValue(query(userRef), resolve));

  try {
    const products = yield call(async function () {
      return await axios.get('/api/products');
    });

    yield put(fetchSuccess(products));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchData() {
  yield takeLatest(types.FETCH_REQUEST, fetchDataAsync);
}
export function* fetchProductAsync(payload) {
  const slug = payload.payload;
  console.log(typeof slug);

  try {
    const products = yield call(async function () {
      return await axios.get(`/api/products/slug/${slug ? slug : '/'}`);
    });

    yield put(fetchProductSucces(products.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}
export function* onFetchProductData() {
  yield takeLatest(types.FETCH_PRODUCT_START, fetchProductAsync);
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

export function* cardRemoveItemAsync({ payload }) {
  console.log(payload);
  try {
    yield put(cartRemoveSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}
export function* onCardRemoveItem() {
  yield takeLatest(types.CARD_REMOVE_ITEM_START, cardRemoveItemAsync);
}

export function* userSigninAsync({ payload }) {
  try {
    const { email, password } = payload;

    const { data } = yield call(async function () {
      return await axios.post(`/api/users/signin`, {
        email,
        password,
      });
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    yield put(userSigninSuccess(data));
  } catch (error) {
    yield put(userSigninFail(error));
  }
}
export function* onUserSignin() {
  yield takeLatest(types.USER_SIGNIN_START, userSigninAsync);
}
const productSaga = [
  fork(onFetchData),
  fork(onFetchProductData),
  fork(onAddToCart),
  fork(onCardRemoveItem),
  fork(onUserSignin),
];
export default function* rootSaga() {
  yield all([...productSaga]);
}

import * as types from './actionTypes';

const initialValue = {
  products: [],
  fetchproduct: [],
  loading: false,
  error: null,
  cart: {
    cartItems: [],
    cartAddLoading: false,
    cartAddError: null,
  },
};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case types.FETCH_PRODUCT:
      return {
        ...state,
        fetchproduct: action.payload,
        loading: false,
      };
    case types.FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.CARD_ADD_ITEM_START:
      return {
        ...state,
        cart: { ...state.cart, cartAddLoading: true },
      };
    case types.CARD_ADD_ITEM_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartAddLoading: false,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    case types.CARD_ADD_ITEM_FAIL:
      return {
        ...state,
        cart: { ...state.cart, cartAddFail: action.payload },
      };
    default:
      return state;
  }
};
export default reducer;

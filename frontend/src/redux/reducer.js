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
    case types.FETCH_PRODUCT_START:
      return {
        ...state,
        fetchproduct: action.payload,
        loading: true,
      };
    case types.FETCH_PRODUCT_SUCCESS:
      // console.log(action.payload);
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
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return {
        ...state,
        cart: {
          ...state.cart,
          cartAddLoading: false,
          cartItems: cartItems,
        },
      };
    case types.CARD_ADD_ITEM_FAIL:
      return {
        ...state,
        cart: { ...state.cart, cartAddFail: action.payload },
      };
    case types.CARD_REMOVE_ITEM_START:
      const filteredItem = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          cartAddLoading: false,
          cartItems: filteredItem,
        },
      };

    default:
      return state;
  }
};
export default reducer;

import * as types from './actionTypes';

const initialValue = {
  products: [],
  loading: true,
  error: null,
};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SUCCES:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case types.FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default reducer;

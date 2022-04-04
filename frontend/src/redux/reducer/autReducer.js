import * as types from '../actionTypes';

const initialValue = {
  loading: false,
  error: null,
  signinUser: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : [],
};

const authReducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.USER_SIGNIN_START:
      return {
        ...state,
        loading: true,
      };

    case types.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        signinUser: action.payload,
      };
    case types.USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

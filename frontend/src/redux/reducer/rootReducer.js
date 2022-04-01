import { combineReducers } from 'redux';
import reducer from './reducer';
import authReducer from './autReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: reducer,
});

export default rootReducer;

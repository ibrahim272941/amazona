import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleWare = createSagaMiddleware();
// let store;
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// if (process.env.NODE_ENV === 'development') {
//   store = createStore(
//     reducer,
//     compose(
//       applyMiddleware(sagaMiddleWare),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// } else {
//   store = createStore(reducer, applyMiddleware(sagaMiddleWare));
// }

sagaMiddleWare.run(rootSaga);

export default store;

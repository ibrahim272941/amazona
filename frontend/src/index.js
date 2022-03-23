import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './context/store';

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <>
        <App />
      </>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

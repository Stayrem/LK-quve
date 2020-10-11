import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/vendor.scss';
import './css-utils/fonts.scss';
import './assets/css/common.scss';
import App from './components/App/App';
import Provider from './store/StoreContext';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);

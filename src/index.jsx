import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/vendor.scss';
import './assets/css/common.scss';
import './css-utils/_index.scss';
import App from './components/app/App';
import Provider from './store/StoreContext';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);

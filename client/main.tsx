import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App'
import reducer from './reducer'

ReactDOM.render(
  <Provider  store = {createStore(reducer)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
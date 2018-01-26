import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './todos/components/App'
import reducer from './todos/reducer/reducer'

ReactDOM.render(
  <Provider  store = {createStore(reducer)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
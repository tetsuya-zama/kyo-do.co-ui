import React from 'react'
import ReactDOM from 'react-dom'
import Kyodoco from './component/kyodoco'
import { Provider } from 'react-redux'
import {configureStore} from './store/store'

import "babel-polyfill"

const container = document.getElementById("app");
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Kyodoco />
  </Provider>,
  container
);

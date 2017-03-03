import React from 'react'
import ReactDOM from 'react-dom'
import Kyodoco from './component/kyodoco'
import { Provider } from 'react-redux'
import {configureStore} from './store/store'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import "babel-polyfill"

const container = document.getElementById("app");
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Kyodoco />
    </MuiThemeProvider>
  </Provider>,
  container
);

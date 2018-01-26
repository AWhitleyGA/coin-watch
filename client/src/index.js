import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import Store from './Store'

const store = Store()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

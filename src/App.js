import React, { Component } from 'react';
import {
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import DashboardView from './views/DashboardView'
import SearchView from './views/SearchView'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <h1>CoinWatch</h1>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/search'>Search</Link>
        </nav>
        <main>
          <Switch>
            <Route
              path='/dashboard'
              component={DashboardView}
            />
            <Route
              path='/search'
              component={SearchView}
            />
            <Route
              path='/*'
              render={() => <Redirect to='/dashboard' />}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App

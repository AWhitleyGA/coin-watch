import React, { Component } from 'react';
import {
  NavLink,
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
      <div className="App">
        <nav className="navbar navbar--primary-theme">
          <h1 className="navbar__header">CoinWatch</h1>
          <NavLink to='/dashboard' className="navbar__item" activeClassName="navbar__item--selected">Dashboard</NavLink>
          <NavLink to='/search' className="navbar__item" activeClassName="navbar__item--selected">Search</NavLink>
        </nav>
        <main className="App__main">
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
        <footer className="footer footer--black-theme">
          <p className="footer__item">by Andrew Whitley</p>
        </footer>
      </div>
    )
  }
}

export default App

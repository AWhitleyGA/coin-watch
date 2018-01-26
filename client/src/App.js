import React, { Component } from 'react'
import {
  NavLink,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'

import { postToken, clearUser } from './actions/auth'

import DashboardView from './views/DashboardView'
import SearchView from './views/SearchView'
import LoginView from './views/LoginView'

import './App.css'

class App extends Component {
  componentDidMount () {
    if (localStorage.getItem('CoinWatchToken')) {
      this.props.checkToken()
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar--primary-theme navbar--row">
          <div className="navbar__section">
            <h1 className="navbar__header">CoinWatch</h1>
            <NavLink to='/dashboard' className="navbar__item" activeClassName="navbar__item--selected">Dashboard</NavLink>
            <NavLink to='/search' className="navbar__item" activeClassName="navbar__item--selected">Search</NavLink>
          </div>
          <div className="navbar__section">
            {
              this.props.auth.user &&
              <button className="navbar__item" onClick={this.props.handleLogout}>Log Out</button>
            }
          </div>
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
              path='/login'
              component={LoginView}
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    checkToken: () => {
      dispatch(postToken())
    },
    handleLogout: () => {
      dispatch(clearUser())
      props.history.push('/login')
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

import React, { Component } from 'react'
import {
  NavLink,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'

import DashboardView from './views/DashboardView'
import SearchView from './views/SearchView'
import LoginView from './views/LoginView'

import { checkAuthentication } from './utils'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    checkAuthentication()
      .then((response) => {
        this.setState({
          user: response.email
        })
      })
  }

  handleLogin (user) {
    this.setState({
      user: user
    })
  }

  handleLogout () {
    localStorage.removeItem('CoinWatchToken')
    this.setState({
      user: null
    })
    this.props.history.push('/login')
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
              this.state.user &&
              <button className="navbar__item" onClick={this.handleLogout}>Log Out</button>
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
              render={(props) => (
                <LoginView
                  {...props}
                  onLogin={this.handleLogin}
                />
              )}
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

export default withRouter(App)

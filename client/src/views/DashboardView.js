import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { checkAuthentication } from '../utils'
import { fetchTickers } from '../actions/tickers'

import CoinDetail from '../components/CoinDetail'


import './DashboardView.css'

class DashboardView extends Component {
  componentDidMount () {
    checkAuthentication()
      .then(() => {
        this.props.fetchTickers()
      })
      .catch(() => {
        this.props.history.replace('/login', {
          previousLocation: this.props.match.url
        })
      })
  }

  render () {
    let coinLinks = this.props.tickers.map((coin, index) => {
      return (
        <NavLink
          to={`${this.props.match.url}/${coin.symbol}`}
          key={index}
          className="navbar__item"
          activeClassName="navbar__item--selected"
        >
          {coin.symbol}
        </NavLink>
      )
    })

    let coinRoutes = this.props.tickers.map((coin, index) => {
      return (
        <Route
          key={index}
          exact path={`${this.props.match.url}/${coin.symbol}`}
          render={() => <CoinDetail coin={coin} />}
        />
      )
    })

    return (
      <div className="Dashboard">
        <nav className="navbar navbar--column navbar--secondary-theme">
          {coinLinks}
        </nav>
        <div className="Dashboard__content">
          <Switch>
            {coinRoutes}
            {
              this.props.tickers.length &&
              <Route
                path="/*"
                render={() => <Redirect to={`${this.props.match.url}/${this.props.tickers[0].symbol}`} />}
              />
            }
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tickers: state.tickers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTickers: () => {
      dispatch(fetchTickers())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)

import React, { Component } from 'react'
import axios from 'axios'
import {
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import CoinDetail from '../components/CoinDetail'

import './DashboardView.css'

class DashboardView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trackedCoins: []
    }
  }

  componentDidMount () {
    axios.get('/api/tickers')
      .then((response) => {
        this.setState({
          trackedCoins: response.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    let coinLinks = this.state.trackedCoins.map((coin, index) => {
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

    let coinRoutes = this.state.trackedCoins.map((coin, index) => {
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
              this.state.trackedCoins.length &&
              <Route
                path="/*"
                render={() => <Redirect to={`${this.props.match.url}/${this.state.trackedCoins[0].symbol}`} />}
              />
            }
          </Switch>
        </div>
      </div>
    )
  }
}


export default DashboardView

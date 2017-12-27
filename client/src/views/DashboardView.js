import React, { Component } from 'react'
import {
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import CoinDetail from '../components/CoinDetail'

const coins = [
  { symbol: 'BTCUSDT' },
  { symbol: 'LTCUSDT' },
  { symbol: 'ETHUSDT' },
  { symbol: 'XRPBTC' }
]

class DashboardView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trackedCoins: []
    }
  }

  componentDidMount () {
    this.setState({
      trackedCoins: coins
    })
  }

  render () {
    let coinLinks = this.state.trackedCoins.map((coin, index) => {
      return (
        <Link key={index} to={`${this.props.match.url}/${coin.symbol}`}>{coin.symbol}</Link>
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
      <div>
        <h1>Dashboard</h1>
        <div>
          {coinLinks}
        </div>
        <div>
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

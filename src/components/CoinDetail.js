import React, { Component } from 'react'
import axios from 'axios'


class CoinDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recentTrades: [],
      timer: setInterval(this.fetchTradeData.bind(this), 5000)
    }
  }

  componentDidMount () {
    this.fetchTradeData()
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  fetchTradeData () {
    axios.get(`http://api.binance.com/api/v1/aggTrades?symbol=${this.props.coin.symbol}USDT`)
      .then((response) => {
        this.setState({
          recentTrades: response
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <h2>{this.props.coin.symbol}</h2>
        <p>{this.props.coin.currentSellPrice}</p>
      </div>
    )
  }
}


export default CoinDetail

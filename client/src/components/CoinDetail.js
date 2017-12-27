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
    axios.get(`http://localhost:3001/api/${this.props.coin.symbol}/trades`)
      .then((response) => {
        this.setState({
          recentTrades: response.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    console.log(this.state.recentTrades)
    return (
      <div>
        <h2>{this.props.coin.symbol}</h2>
        <p>{this.props.coin.currentSellPrice}</p>
      </div>
    )
  }
}


export default CoinDetail

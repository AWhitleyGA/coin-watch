import React, { Component } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts'
import { connect } from 'react-redux'

import { fetchPriceHistory } from '../actions/prices'
import { selectTicker } from '../actions/tickers'

class CoinDetail extends Component {

  componentDidMount () {
    this.props.setTicker(this.props.coin.symbol)
    this.props.fetchPriceHistory()
  }

  render () {
    return (
      <div>
        <h2>{this.props.tickers.selectedTicker}</h2>
        {
          !this.props.prices.priceHistory[0] ?
          <p>Loading...</p> :
          <div>
            <p>{this.props.prices.priceHistory[0] && this.props.prices.priceHistory[0].price}</p>
            <ResponsiveContainer
              width="90%"
              height={400}
            >
              <LineChart
                margin={{
                  top: 10,
                  bottom: 10,
                  left: 50,
                  right: 0
                }}
                data={this.props.prices.priceHistory}
              >
                <CartesianGrid strokeDasharray='2 2' />
                <XAxis dataKey='time' />
                <YAxis
                  dataKey='price'
                  domain={['dataMin', 'dataMax']}
                />
                <Line
                  type='monotone'
                  dataKey='price'
                  stroke='rgb(59, 182, 206)'
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prices: state.prices,
    tickers: state.tickers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPriceHistory: () => {
      dispatch(fetchPriceHistory())
    },
    setTicker: (ticker) => {
      dispatch(selectTicker(ticker))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CoinDetail)

import React, { Component } from 'react'
import axios from 'axios'
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from 'recharts'
import moment from 'moment'

class CoinDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recentPrices: [],
    }
  }

  componentDidMount () {
    this.fetchTradeData()
  }

  fetchTradeData () {
    axios.get(`/api/prices/${this.props.coin.symbol}`)
      .then((response) => {
        this.setState({
          recentPrices: response.data.map((price) => {
            return {
              time: moment(price[0]).format('h:mma'),
              price: parseFloat(price[1])
            }
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    console.log(this.state.recentPrices)
    return (
      <div>
        <h2>{this.props.coin.symbol}</h2>
        {
          !this.state.recentPrices[0] ?
          <p>Loading...</p> :
          <div>
          <p>{this.state.recentPrices[0] && this.state.recentPrices[0].price}</p>
          <LineChart
            width={500}
            height={300}
            data={this.state.recentPrices}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis
              dataKey='price'
              domain={['dataMin', 'dataMax']}
            />
            <Line
              type='monotone'
              dataKey='price'
              stroke='#88FF88'
            />
          </LineChart>
          </div>
        }
      </div>
    )
  }
}


export default CoinDetail

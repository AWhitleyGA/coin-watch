import axios from 'axios'
import moment from 'moment'

export function receivePrices (prices) {
  return {
    type: 'RECEIVE PRICES',
    payload: prices
  }
}

export function fetchPrices () {
  return (dispatch, getState) => {
    axios({
      method: 'get',
      url: '/api/prices',
      headers: {
        Authorization: localStorage.getItem('CoinWatchToken')
      }
    })
    .then((res) => {
      dispatch(receivePrices(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export function fetchPriceHistory () {
  return (dispatch, getState) => {
    dispatch(clearPriceHistory())
    let ticker = getState().tickers.selectedTicker
    axios.get(`/api/prices/${ticker}`)
      .then((res) => {
        let history = res.data.map((price) => {
          return {
            time: moment(price[0]).format('h:mma'),
            price: parseFloat(price[1])
          }
        })
        dispatch(receivePriceHistory(history))
      })
      .catch((err) => {
        console.log(err)
      })

  }
}

export function receivePriceHistory (history) {
  return {
    type: 'RECEIVE PRICE HISTORY',
    payload: history
  }
}

export function clearPriceHistory () {
  return {
    type: 'CLEAR PRICE HISTORY'
  }
}

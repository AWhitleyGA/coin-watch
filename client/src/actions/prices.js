import axios from 'axios'

export function receivePrices (prices) {
  return {
    type: 'RECEIVE PRICES',
    prices
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

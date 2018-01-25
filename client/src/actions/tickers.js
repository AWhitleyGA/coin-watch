import axios from 'axios'

export function fetchTickers () {
  return (dispatch, getState) => {
    axios({
      method: 'get',
      url: '/api/tickers',
      headers: {
        Authorization: localStorage.getItem('CoinWatchToken')
      }
    })
    .then((res) => {
      dispatch(receiveTickers(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export function receiveTickers (tickers) {
  return {
    type: 'RECEIVE TICKERS',
    tickers
  }
}

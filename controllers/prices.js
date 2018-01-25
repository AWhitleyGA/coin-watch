const express = require('express')
const axios = require('axios')

const auth = require('../auth')()

const router = express.Router()


router.get('/', (req, res) => {
  axios.get('http://api.binance.com/api/v1/ticker/allPrices')
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.get('/:symbol', (req, res) => {
  axios.get('http://api.binance.com/api/v1/klines', {
    params: {
      symbol: `${req.params.symbol}`,
      interval: '15m',
      limit: 48
    }
  })
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = router

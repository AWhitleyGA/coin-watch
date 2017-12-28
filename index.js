const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(cors())

app.set('port', process.env.PORT || 3001)

app.get('/api/prices', (req, res) => {
  axios.get('http://api.binance.com/api/v1/ticker/allPrices')
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.get('/api/prices/:symbol', (req, res) => {
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
      res.json(err)
    })
})

app.use(express.static('client/build'))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(app.get('port'))

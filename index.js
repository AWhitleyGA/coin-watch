const express = require('express')
const axios = require('axios')
const cors = require('cors')
const parser = require('body-parser')

const mongoose = require('./db/schema')
const Ticker = mongoose.model('Ticker')

const app = express()

app.use(cors())
app.use(parser.json())

app.set('port', process.env.PORT || 3001)

app.get('/api/tickers', (req, res) => {
  Ticker.find({})
    .then((tickers) => {
      res.json(tickers)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

app.post('/api/tickers', (req, res) => {
  Ticker.create(req.body)
    .then((ticker) => {
      res.json(ticker)
    })
    .catch((err) => {
      res.json(err)
    })
})

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

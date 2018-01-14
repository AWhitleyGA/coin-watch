const express = require('express')
const axios = require('axios')
const cors = require('cors')
const parser = require('body-parser')
const jwt = require('jwt-simple')

const mongoose = require('./db/schema')
const Ticker = mongoose.model('Ticker')
const User = mongoose.model('User')

const auth = require('./auth')()
const config = require('./config')

const app = express()

app.use(cors())
app.use(parser.json())
app.use(auth.initialize())

app.set('port', process.env.PORT || 3001)

app.post('/api/auth/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              let token = jwt.encode({ _id: user._id }, config.jwtSecret)
              res.json({
                token: token,
                email: user.email
              })
            } else {
              res.status(401).send('email and passord do not match')
            }
          })
      } else {
        res.status(404).send('user not found')
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

app.get('/api/auth/user', auth.authenticate(), (req, res) => {
  if (req.user) {
    res.json({
      email: req.user.email
    })
  } else {
    res.status(401).send()
  }
})

app.get('/api/tickers', auth.authenticate(), (req, res) => {
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

app.listen(app.get('port'), () => {
  console.log(`Express starting on ${app.get('port')}`)
})

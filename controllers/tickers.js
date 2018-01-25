const express = require('express')

const mongoose = require('../db/schema')
const Ticker = mongoose.model('Ticker')

const auth = require('../auth')()

const router = express.Router()

router.use(auth.initialize())


router.get('/', auth.authenticate(), (req, res) => {
  req.user.populate('tickers').execPopulate()
    .then((user) => {
      res.json(user.tickers)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.post('/', auth.authenticate(), (req, res) => {
  Ticker.create(req.body)
    .then((ticker) => {
      req.user.tickers.push(ticker)
      req.user.save()
        .then(() => {
          res.json(ticker)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

module.exports = router

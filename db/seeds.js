const mongoose = require('./schema.js')

const Ticker = mongoose.model('Ticker')
const User = mongoose.model('User')

const tickers = new Promise((resolve, reject) => {
  Ticker.remove({})
    .then(() => {
      return Ticker.create([
        { symbol: 'ETHBTC' },
        { symbol: 'XRPETH' },
        { symbol: 'QTUMETH' },
        { symbol: 'BTCUSDT' }
      ])
      .then(() => {
        resolve()
      })
    })
    .catch((err) => {
      console.log(err)
      reject()
    })
})

const users = new Promise((resolve, reject) => {
  User.remove({})
    .then(() => {
      return User.create([
        { email: 'test@gmail.com', password: 'password' }
      ])
      .then(() => {
        resolve()
      })
    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
})

Promise.all([tickers, users])
  .then(() => {
    process.exit()
  })

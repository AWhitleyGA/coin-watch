const mongoose = require('./schema.js')

const Ticker = mongoose.model('Ticker')
const User = mongoose.model('User')

const createTickers = new Promise((resolve, reject) => {
  Ticker.remove({})
    .then(() => {
      return Ticker.create([
        { symbol: 'ETHBTC' },
        { symbol: 'XRPETH' },
        { symbol: 'QTUMETH' },
        { symbol: 'BTCUSDT' }
      ])
      .then((tickers) => {
        resolve(tickers)
      })
    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
})

const createUsers = new Promise((resolve, reject) => {
  User.remove({})
    .then(() => {
      return User.create([
        { email: 'test@gmail.com', password: 'password' }
      ])
      .then((users) => {
        resolve(users)
      })
    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })
})

Promise.all([createTickers, createUsers])
  .then((res) => {
    const tickers = res[0]
    const users = res[1]

    const associations = new Promise((resolve, reject) => {
      users.forEach((user, index) => {
        user.update({ tickers: tickers })
          .then(() => {
            if (index === users.length - 1) {
              resolve()
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    })

    associations.then(() => {
      process.exit()
    })

  })

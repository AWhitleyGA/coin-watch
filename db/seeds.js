const mongoose = require('./schema.js')

const Ticker = mongoose.model('Ticker')


Ticker.create([
  { symbol: 'ETHBTC' },
  { symbol: 'XRPETH' },
  { symbol: 'QTUMETH' },
  { symbol: 'BTCUSDT' }
])
.then(() => {
  process.exit()
})

const mongoose = require('./connection.js')

const TickerSchema = new mongoose.Schema({
  symbol: String
})

mongoose.model('Ticker', TickerSchema)

module.exports = mongoose

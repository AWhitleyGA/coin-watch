const mongoose = require('./connection.js')

const TickerSchema = new mongoose.Schema({
  symbol: String
})

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
})

mongoose.model('Ticker', TickerSchema)
mongoose.model('User', UserSchema)

module.exports = mongoose

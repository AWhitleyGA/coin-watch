const mongoose = require('./connection.js')
const bcrypt = require('bcrypt')
const saltWorkFactor = 10

const TickerSchema = new mongoose.Schema({
  symbol: String
})

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, saltWorkFactor)
    .then((hashedPassword) => {
      this.password = hashedPassword
      next()
    })
    .catch((err) => {
      next(err)
    })
})

UserSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

mongoose.model('Ticker', TickerSchema)
mongoose.model('User', UserSchema)

module.exports = mongoose

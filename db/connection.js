const mongoose = require('mongoose')
const mongoUrl

if (process.env.NODE_ENV === 'production') {
  mongoUrl = process.env.MONGODB_URI
} else {
  mongoUrl = 'mongodb://localhost/coinwatch'
}

mongoose.connect(mongoUrl, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(err)
  }
})

mongoose.Promise = Promise

module.exports = mongoose

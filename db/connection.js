const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
  const mongoUrl = process.env.MONGODB_URI
} else {
  const mongoUrl = 'mongodb://localhost/coinwatch'
}

mongoose.connect('mongodb://localhost/coinwatch', { useMongoClient: true }, (err) => {
  if (err) {
    console.log(err)
  }
})

mongoose.Promise = Promise

module.exports = mongoose

const mongoose = require('mongoose')
const mongoUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/coinwatch'


mongoose.connect(mongoUrl, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(err)
  }
})

mongoose.Promise = Promise

module.exports = mongoose

const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/coinwatch', { useMongoClient: true }, (err) => {
  if (err) {
    console.log(err)
  }
})

mongoose.Promise = Promise

module.exports = mongoose

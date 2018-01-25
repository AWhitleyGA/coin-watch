const express = require('express')
const axios = require('axios')
const cors = require('cors')
const parser = require('body-parser')

const authController = require('./controllers/auth')
const tickersController = require('./controllers/tickers')
const pricesController = require('./controllers/prices')

const app = express()

app.use(cors())
app.use(parser.json())
app.use(express.static('client/build'))

app.set('port', process.env.PORT || 3001)

app.use('/api/auth', authController)
app.use('/api/tickers', tickersController)
app.use('/api/prices', pricesController)


app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(app.get('port'), () => {
  console.log(`Express starting on ${app.get('port')}`)
})

const express = require('express')
const jwt = require('jwt-simple')

const mongoose = require('../db/schema')
const User = mongoose.model('User')

const auth = require('../auth')()
const config = require('../config')

const router = express.Router()

router.use(auth.initialize())


router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              let token = jwt.encode({ _id: user._id }, config.jwtSecret)
              res.json({
                token: token,
                email: user.email
              })
            } else {
              res.status(401).send('email and passord do not match')
            }
          })
      } else {
        res.status(404).send('user not found')
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

router.get('/user', auth.authenticate(), (req, res) => {
  if (req.user) {
    res.json({
      email: req.user.email
    })
  } else {
    res.status(401).send()
  }
})

module.exports = router

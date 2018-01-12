const passport = require('passport')
const passportJWT = require('passport-jwt')

const mongoose = require('./db/schema')
const User = mongoose.model('User')

const config = require('./config')

const Strategy = passportJWT.Strategy
const strategyParams = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: passportJWT.ExtractJwt.fromHeader('authorization')
}

module.exports = () => {
  const strategy = new passportJWT.Strategy(strategyParams, (payload, done) => {
    User.findOne({ _id: payload._id })
      .then((user) => {
        if (user) {
          return done(null, user)
        } else {
          return done(new Error('User Not Found'), null)
        }
      })
      .catch((err) => {
        return done(err, null)
      })
  })

  passport.use(strategy)

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate('jwt', config.jwtSession)
    }
  }
}

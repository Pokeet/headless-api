const passport = require('passport')
const passportJWT = require('passport-jwt')

const User = require('../models/User')

const { Strategy } = passportJWT
const { ExtractJwt } = passportJWT

const API_SECRET = process.env.API_SECRET

const params = {
  secretOrKey: API_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
}

module.exports = {

  init: function () {
    passport.use(new Strategy(params, (payload, done) => {
      User.findOne({
        id: payload.id
      }, (err, user) => {
        if (err) {
          return done(err, false)
        }

        if (user) {
          return done(null, user)
        }

        return done(null, false)
      })
    }))

    return passport.initialize()
  },

  authenticate: function () {
    return passport.authenticate('jwt', {
      session: false
    })
  }

}

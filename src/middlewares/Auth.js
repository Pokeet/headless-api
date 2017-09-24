import passport from 'passport';
import passportJWT from 'passport-jwt';

import User from '../models/User';

import config from '../../config';

const { Strategy } = passportJWT;
const { ExtractJwt } = passportJWT;

const params = {
  secretOrKey: config.appSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
};

module.exports = {

  init: function () {
    passport.use(new Strategy(params, (payload, done) => {
      User.findOne({
        id: payload.id,
      }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      });
    }));

    return passport.initialize();
  },

  authenticate: function () {
    return passport.authenticate('jwt', {
      session: config.jwtSession,
    });
  },

};

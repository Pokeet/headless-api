import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from '../../config';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter an email and a password to register.' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, message: 'That email address elready exists.' });
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, (err2, isMatch) => {
        if (isMatch && !err2) {
          // create the token
          console.log(user);
          const token = jwt.sign({ user }, config.appSecret, {
            expiresIn: 10080,
          });
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.json({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

router.get('/test', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  res.json({ success: true, message: 'it works !'});
})

module.exports = router;

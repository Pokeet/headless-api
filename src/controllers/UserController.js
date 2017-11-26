import express from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'
import User from '../models/User'

import Auth from '../middlewares/Auth'

import {check, validationResult} from 'express-validator/check'

const router = express.Router()

router.post('/', [
  check('email').exists('is required')
    .isEmail().withMessage('must be a valid email')
    .trim()
    .normalizeEmail()
    .custom(value => {
      return new Promise((resolve, reject) => {
        User.findOne({email: value}, 'email', (err, user) => {
          console.log(user)
          if (err) {
            console.error(err.message)
            reject(new Error(err.message))
          }
          if (user) {
            reject(new Error('this email is already in use'))
          } else {
            resolve(true)
          }
        })
      })
    }),
  check('password').exists()
    .isLength({min: 12}),
  check('passwordConfirmation', 'passwordConfirmation must be the same as password').exists()
    .custom((value, {req}) => value === req.body.password)
],
(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    })

    newUser.save((err) => {
      if (err) {
        res.status(500).json({ errors: [err.message] })
      } else {
        res.status(200).json({
          data: {
            user: newUser
          }
        })
      }
    })
  }
})

router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' })
    } else {
      user.comparePassword(req.body.password, (err2, isMatch) => {
        if (isMatch && !err2) {
          // create the token
          const token = jwt.sign({ user }, config.appSecret, {
            expiresIn: 10080
          })
          res.status(200).json({
            data: {
              token: `JWT ${token}`
            }
          })
        } else {
          res.status(400).json({
            errors: [
              'Authentication failed. Passwords did not match.'
            ]
          })
        }
      })
    }
  })
})

router.get('/test', Auth.authenticate(), (req, res) => {
  res.end('ok')
})

module.exports = router

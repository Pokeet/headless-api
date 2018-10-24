const express = require('express')

const Application = require('../models/Application')
const Auth = require('../middlewares/Auth')

const router = express.Router()

const ExpressValidator = require('express-validator/check')
const { check, validationResult } = ExpressValidator

router.post('/', [
  Auth.authenticate(),
  check('name').exists('is required').trim()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty() || req.user == null) {
    res.status(400).json({ errors: errors.array() })
  } else {
    const newApplication = new Application({
      name: req.body.name,
      description: req.body.description
    })
    newApplication.users.push({
      userId: req.user._id,
      role: 'Owner'
    })
    newApplication.save(err => {
      if (err) {
        res.status(500).json({
          errors: [
            err.message
          ]
        })
      } else {
        res.status(200).json({
          data: {
            application: newApplication
          }
        })
      }
    })
  }
})

router.get('/:appID', Auth.authenticate(), (req, res) => {
  let application = Application.findOne({
    appID: req.params.appID
  })
  res.status(200).json({
    data: {
      application: application
    }
  })
})

router.get('/', (req, res) => {
  res.end('applications s')
})

module.exports = router

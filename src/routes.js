const express = require('express')

const UserController = require('./controllers/UserController')
const ApplicationController = require('./controllers/ApplicationController')
const ModelsController = require('./controllers/ModelsController')

const Package = require('../package.json')

const router = express.Router()

router.use('/users', UserController)
router.use('/applications', ApplicationController)
router.use('/models', ModelsController)

router.get('/', (req, res) => {
  res.end('pokeet headless-api version: ' + Package.version)
})

module.exports = router

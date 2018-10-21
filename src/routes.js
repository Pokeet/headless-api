const express = require('express')

const ModelsController = require('./controllers/ModelsController')
const UserController = require('./controllers/UserController')

const Package = require('../package.json')

const router = express.Router()

router.use('/models', ModelsController)
router.use('/users', UserController)

router.get('/', (req, res) => {
  res.end('pokeet headless-api version: ' + Package.version)
})

module.exports = router

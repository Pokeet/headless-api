import express from 'express'

import ModelsController from './controllers/ModelsController'
import UserController from './controllers/UserController'

import Package from '../package.json'

const router = express.Router()

router.use('/models', ModelsController)
router.use('/users', UserController)

router.get('/', (req, res) => {
  res.end('pokeet headless-api version : ' + Package.version)
})

module.exports = router

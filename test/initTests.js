const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised')

const Database = require('../src/middlewares/Database')

const PORT = process.env.PORT
const API_VERSION = process.env.API_VERSION

const apiBaseUrl = `localhost:${PORT}/api/${API_VERSION}`

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const should = chai.should()
const expect = chai.expect

process.env.NODE_ENV = 'testing'

module.exports = {
  chai,
  should,
  expect,
  apiBaseUrl,
  Database
}

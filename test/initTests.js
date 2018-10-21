const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const should = chai.should()
const expect = chai.expect

process.env.NODE_ENV = 'testing'

module.exports = {
  chai,
  should,
  expect
}

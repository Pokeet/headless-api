import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const should = chai.should()

process.env.NODE_ENV = 'testing'
process.env.PORT = '3300'

module.exports = {
  chai,
  should
}

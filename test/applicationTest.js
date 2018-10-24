const TestCommon = require('./initTests')
const { chai, expect, apiBaseUrl, Database } = TestCommon

const UserUtils = require('./utils/userUtils')
const Application = require('../src/models/Application')

let authToken = null

const testUserCredentials = {
  email: 'testUser@tester.com',
  password: 'abcdefghijklmnopkrstuvwxyz'
}

describe('test application api', () => {
  // create a test user
  before(done => {
    UserUtils.createTestUser(testUserCredentials).then(res => {
      authToken = res.token
      done()
    }).catch((err) => {
      done(err)
    })
  })

  after(done => {
    UserUtils.clearCreatedTestUsers()

    Application.deleteMany({ name: 'testApp' }, (err, removed) => {
      if (err) {
        console.error('error clearing test applicaiton')
      }
    })

    Database.close()
    done()
  })

  // create application
  describe('Check application creation', () => {
    describe('Trying to create application without auth or fields', () => {
      it('should return status 401 with errors array', done => {
        chai.request(apiBaseUrl)
          .post('/applications')
          .end((err, res) => {
            expect(err).to.be.null
            res.should.have.status(401)
            done()
          })
      })
    })

    describe('Trying to create application with auth but no fields', () => {
      it('should return status 400 with errors array', done => {
        chai.request(apiBaseUrl)
          .post('/applications')
          .set({
            Authorization: `JWT ${authToken}`
          })
          .end((err, res) => {
            expect(err).to.be.null
            res.should.have.status(400)
            done()
          })
      })
    })

    describe('Trying to create application with auth and name set', () => {
      it('should return status 200 with application named "testApp"', done => {
        chai.request(apiBaseUrl)
          .post('/applications')
          .set({
            Authorization: `JWT ${authToken}`
          }).send({
            name: 'testApp'
          })
          .end((err, res) => {
            expect(err).to.be.null
            res.should.have.status(200)
            res.body.data.application.should.exist
            res.body.data.application.name.should.equal('testApp')
            done()
          })
      })
    })
  })
})

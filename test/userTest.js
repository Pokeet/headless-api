import Database from '../src/middlewares/Database'
import {chai, should} from './initTests'
import User from '../src/models/User'
import config from '../config.js'

const apiBaseUrl = 'localhost:3000/api/' + config.apiVersion

describe('test user api', () => {
  // Connect to DB
  before(done => {
    Database.init().then(connection => {
      done()
    }).catch(err => {
      if (err) {
        console.error('Error when intiailising DB connection : ' + err.message)
      }
      done()
    })
  })

  // Close db
  after(done => {
    // clean users
    User.remove({}, (err, removed) => {
      if (err) {
        console.error('error clearing users for tests')
      }
      Database.close()
      done()
    })
  })

  // create a user
  describe('check user creation', () => {
    describe('trying to create user without any field', () => {
      it('should return status 400 with errors array', done => {
        chai.request(apiBaseUrl)
          .post('/users')
          .end((err, res) => {
            err.should.not.be.null
            res.should.have.status(400)
            res.body.errors.should.be.an('array').that.is.not.empty
            done()
          })
      })
    })

    describe('trying to create user with invalid email', () => {
      it('should return status 400 for invalid email', done => {
        chai.request(apiBaseUrl)
          .post('/users')
          .send({
            'email': 'invalidmail',
            'password': '012345678901',
            'passwordConfirmation': '012345678901'
          })
          .end((err, res) => {
            err.should.not.be.null
            res.should.have.status(400)
            res.body.errors.should.be.an('array').that.is.not.empty
            res.body.errors[0].param.should.equal('email')
            done()
          })
      })
    })

    describe('trying to create user with all valid fields', () => {
      it('should return status 200', done => {
        chai.request(apiBaseUrl)
          .post('/users')
          .send({
            'email': 'randomuser@randommail.mail',
            'password': '012345678901',
            'passwordConfirmation': '012345678901'
          })
          .end((err, res) => {
            should.not.exist(err)
            res.should.have.status(200)
            should.exist(res.body.data.user)
            done()
          })
      })
    })
  })
})

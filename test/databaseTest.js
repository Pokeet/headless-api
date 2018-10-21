const Database = require('../src/middlewares/Database')
const { should } = require('./initTests')

describe('database', function () {
  describe('init', function () {
    it('should fullfil the promise with a connection', function () {
      return Database.init().should.be.fulfilled.and.eventually.exist
    })
  })

  describe('getConnection', function () {
    it('should return the databse readyState equal to connected (1)', function () {
      return should.equal(Database.getConnection().readyState, 1)
    })
  })

  describe('close', function () {
    it('should close the database connection', function () {
      return Database.close().should.be.fulfilled
    })
  })

  describe('getConnection', function () {
    it('should return the databse readyState equal to disconnected (0)', function () {
      return should.equal(Database.getConnection().readyState, 0)
    })
  })
})

import Database from '../src/middlewares/Database';
import should from './initTests';

describe('database', function () {
  describe('init', function () {
    it('should fullfil the promise with a connection', function () {
      return Database.init().should.be.fulfilled.and.eventually.exist;
    });
  });

  describe('getConnection', function () {
    it('should return the databse connection object', function () {
      return Database.getConnection().should.exist;
    });
  });

  describe('close', function () {
    it('should close the database connection', function () {
      return Database.close().should.be.fulfilled;
    });
  });

  describe('getConnection', function () {
    it('should return null after connection closed', function () {
      return should.equal(Database.getConnection(), null);
    });
  });
});

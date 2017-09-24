import Database from '../src/middlewares/Database';
import should from './initTests';

describe('database', () => {
  describe('init', () => {
    it('should fullfil the promise with a connection', () => {
      return Database.init().should.be.fulfilled.and.eventually.exist;
    });
  });

  describe('getConnection', () => {
    it('should return the databse connection object', () => {
      return Database.getConnection().should.exist;
    });
  });

  describe('close', () => {
    it('should close the database connection', () => {
      return Database.close().should.be.fulfilled;
    });
  });

  describe('getConnection', () => {
    it('should return null after connection closed', () => {
      return should.equal(Database.getConnection(), null);
    });
  });
});

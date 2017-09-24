import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const should = chai.should();

process.env.NODE_ENV = 'testing';

module.exports = should;

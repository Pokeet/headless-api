const { assert } = require('chai');

process.env.NODE_ENV = 'testing';

const main = require('../src/main');

describe('main', () => {
  it('should return app', () => {
    const result = main.app;
    assert.isNotNull(result);
  });
});

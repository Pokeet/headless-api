const { assert } = require('chai');

const main = require('../src/main');

describe('main', () => {
  it('should return app', () => {
    const result = main.app;
    assert.isNotNull(result);
  });
});

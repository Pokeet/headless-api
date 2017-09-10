const { assert } = require('chai');

const moduleA = require('../src/moduleA');

describe('moduleA', () => {
  it('should return hi', () => {
    const result = moduleA.dummieA();
    assert.equal(result, 'hi');
  });
});

// simple test to check if mocha and chai work properly
const expect = require('chai').expect;

describe('A suite', () => {
  it('contains spec with an expectation', () => {
    expect(true).to.be.true;
  });
});

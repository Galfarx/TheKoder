// simple test to check if mocha and chai work properly
const expect = require('chai').expect;

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).to.be.true;
  });
});

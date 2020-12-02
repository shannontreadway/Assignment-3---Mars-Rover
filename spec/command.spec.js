const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  //Test 1 - Given in the starter code
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

  //Test 2 - Does constructor work to set the command type?
  it("constructor sets command type", function() {
    assert.strictEqual(new Command('commandType').commandType, "commandType");
  });

  //Test 3 - Does the constructor work to set the value?
  it("constructor sets a value passed in as the second argument", function() {
    assert.strictEqual(new Command('commandType', 'value').value, "value");
  });
});
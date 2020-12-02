const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Message class", function() {
  //Test 4
  it("throws an error if a name is NOT passed into the construtor as the first parameter", function(){
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });

  //Test 5
  it("constructor sets the name", function(){
    assert.strictEqual(new Message('name', 'commands').name, 'name')
  });


  // Test 6
  it("contains a commands array passed into the construtor as 2nd argument", function() {
    // Create an array of commands to pass into a message.
    let testCommandA = new Command('commandTypeA', 'valueA');
    let testCommandB = new Command('commandTypeB', 'valueB');
    let commandArr = [testCommandA, testCommandB]
    
    let message = new Message('name', commandArr);

    //I learned from Levi that one it statment can have multiple assert statements.
    // Loop over commands argument in Message to ensure that it contains the elements of the Command (both the commandType and value).
    for(let i=0; i<message.commands.length; i++) {
      assert.strictEqual(message.commands[i].commandType, commandArr[i].commandType)
      assert.strictEqual(message.commands[i].value, commandArr[i].value)
    }
  });


});
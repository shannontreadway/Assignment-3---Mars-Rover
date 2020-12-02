const assert = require('assert');
const Rover = require ('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');



describe("Rover class", function() {

  // Test 7
  it('constructor sets position and default values for mode and generatorWatts', function() {
    assert.strictEqual(new Rover(98382).position, 98382);
    assert.strictEqual(new Rover(98382).mode, 'NORMAL');
    assert.strictEqual(new Rover(98382).generatorWatts, 110);
  });

  // Tests 8 through 14 follow the following format: Create commands and message to pass into a testing rover.  Run assert statements.

  // Test 8
  it('response returned by receiveMessage contains a name of message', function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('name', commands);

    assert.strictEqual((new Rover(98382).receiveMessage(message)).message, 'name');
  });

  //Test 9
  it('response returned by reveiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('name', commands);
    
    assert.strictEqual((new Rover(98382).receiveMessage(message).results.length), 2);
  });

  //Test 10
  it('responds correctly to status check command', function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('name', commands);
    let rover = new Rover(98382);
    // Create variable to keep code neater looking.
    let roverStatus = rover.receiveMessage(message).results[0].roverStatus;
   
    assert.strictEqual(roverStatus.mode, 'NORMAL');
    assert.strictEqual(roverStatus.position, 98382);
    assert.strictEqual(roverStatus.generatorWatts, 110);
    assert.strictEqual(rover.receiveMessage(message).results[0].completed, true);
  });

  // Test 11
  it('responds correctly to mode change command', function() {
    //for MODE_CHANGE, NORMAL
    let commands = [new Command("MODE_CHANGE", "NORMAL")];
    let message = new Message('name', commands);
    let rover = new Rover(98382);
    // Create variable to keep code neater looking.  This is done for several of the next tests. 
    let roverStatus = rover.receiveMessage(message).results[0].roverStatus;
    // Assert statements for MODE_CHANGE, NORMAL
    assert.strictEqual(rover.receiveMessage(message).results[0].completed, true);
    assert.strictEqual(roverStatus.mode, 'NORMAL');
    // Ensure these properties did not change.
    assert.strictEqual(roverStatus.position, 98382);
    assert.strictEqual(roverStatus.generatorWatts, 110);

    // for MODE_CHANGE, LOW_POWER
    commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    messageB = new Message ('name', commands);
    rover = new Rover(98382);
    roverStatus = rover.receiveMessage(messageB).results[0].roverStatus;

    // Assert statements for MODE_CHANGE, LOW_POWER
    assert.strictEqual(rover.receiveMessage(message).results[0].completed, true);
    assert.strictEqual(roverStatus.mode, 'LOW_POWER');
    // Ensure these properties did not change.
    assert.strictEqual(roverStatus.position, 98382);
    assert.strictEqual(roverStatus.generatorWatts, 110);    
  });

  // Test 12
  it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 99999)];
    let message = new Message('name', commands);
    let rover = new Rover(98382);

    assert.strictEqual(rover.receiveMessage(message).results[1].completed, false);
  });

  // Test 13
  it('responds with position for move command', function() {
    let commands = [new Command('MOVE', 99999)];
    let message = new Message('name', commands);
    let rover = new Rover(98382);
    let roverStatus = rover.receiveMessage(message).results[0].roverStatus;
    
    assert.strictEqual(roverStatus.position, 99999);
  });

  // Bonus Mission - Test 14
  it('completed false and a message for an unknown command', function() {
    let commands = [new Command('TEST')];
    let message = new Message('name', commands);
    let rover = new Rover(98382);
    let roverResults = rover.receiveMessage(message).results[0];
    
    assert.strictEqual(roverResults.completed, false);
    assert.strictEqual(roverResults.message, "Command unknown");
  });

});
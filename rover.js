const Command = require("./command.js");
const Message = require("./message.js");

// Create a rover class that takes a value for the position while mode and generatorWatts are automatically assigned.
class Rover {
  constructor(position){
    this.position = position;
    // mode and generatorWatts are default values unless changed.
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  
  // Method for rover class to receive messages and respond appropriately.
  receiveMessage(message) {
    // Define results array for how rover class will respond to message.
    let results = [];

    // Iterate over the commands within the message class
    for (let i=0; i<message.commands.length; i++){
      // Set variable command to save typing "message.commands[i]" multiple times through the code.
      let command = message.commands[i];

      // "STATUS_CHECK" has a result object with completed key being true and roverStatus key being an object containing the rover's curring mode, generatorWatts, and position.
      if (command.commandType === 'STATUS_CHECK') {
        let result = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        }
        // Push result object to results array. This is the same at the end of every if / else if / else statement.
        results.push(result);
      //Next, test the "MOVE" command
      } else if (command.commandType === "MOVE") {
        // Rover cannot move if in "LOW_POWER" mode.  Result object contains completed key with a false value.
        if (this.mode === 'LOW_POWER') {
          let result = {
            completed: false
          };
          results.push(result);
        // When rover is in "NORMAL" mode, it can move to the new position given in the command.value place. Result is an object similar to result object from "STATUS_CHECK" command with the new position.
        } else {
          this.position = command.value;
          let result = {
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          }
          results.push(result);
        }
      // "MODE_CHANGE" command changes the mode between "NORMAL" and "LOW_POWER" based on the given value of the command. Result is similar to result object given for 'STATUS_CHECK' with the mode being updated to the given value.
      } else if (command.commandType === "MODE_CHANGE") {
        if (command.value === 'NORMAL') {
          // This is put in so the mode will change from to 'NORMAL' if in 'LOW_POWER'.
          this.mode = 'NORMAL';
          let result = {
            completed: true,
            roverStatus: {
              mode: command.value,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          }
          results.push(result); 
        } else if (command.value === 'LOW_POWER') {
          this.mode = 'LOW_POWER';
          let result = {
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          }
          results.push(result); 
        } 
      // If the command is anything other than the three we just tested for, the result is an object with completed being false and a message saying 'command unknown.'
      } else {
        let result = {
          completed: false,
          message: "Command unknown"
        }
        results.push(result);

      }
         
    }

    // The response to the message is an object taking the name value of the message and the results array created by the if / else if / else statements.
    let response = {message: message.name, results: results};
    return response;
  }

}

module.exports = Rover;
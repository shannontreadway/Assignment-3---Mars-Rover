const Command = require("./command.js");

// Create a message class where a message name is required and can take an array of command objects.
class Message {
  constructor(name, commands) {
    //name = string that contains name of the message
    this.name = name;
    if (!name) {
      throw Error("Name required.");
    }
    //commands = array of command objects
    this.commands = commands;
  }

}

module.exports = Message;
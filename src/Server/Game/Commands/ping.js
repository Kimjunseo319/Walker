const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  console.log(args);
  handler.sendChat(handler.chatType.System, "오옹옹", false);
}

module.exports = execute;

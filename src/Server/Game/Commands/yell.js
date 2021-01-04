const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  let sendType = handler.chatType.System;
  sendType = args[0];
  //if (args[0] === "system") sendType = handler.chatType.System;
  //else if (args[0] === "mega") sendType = handler.chatType.megaphone;

  handler.sendChat(sendType, args.splice(1).join(" "));
}

module.exports = execute;

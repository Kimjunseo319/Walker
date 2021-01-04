const { loadCommand } = require("../../../Utils/CommandLoader");
const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  if (args[0] == "channel") {
    const channel = require("../Handlers/ChannelHandler");
    new channel(handler).handleChannelInfo();
  }
}

module.exports = execute;

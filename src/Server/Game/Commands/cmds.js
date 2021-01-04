const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  const cmds = Object.keys(global.cmdList).join(" / ");
  handler.sendChat(handler.chatType.System, `명령어 리스트: ${cmds}`, false);
}

module.exports = execute;

const { loadCommand } = require("../../../Utils/CommandLoader");
const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  loadCommand();
  handler.sendChat(handler.chatType.System, "명령어가 다시 로드 되었습니다!");
}

module.exports = execute;

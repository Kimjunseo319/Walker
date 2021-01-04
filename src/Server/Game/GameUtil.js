const CharacterDB = require("../../Utils/models/Character");
const ChatHandler = require("./Handlers/ChatHandler");

class GameUtil {
  /**
   *
   * @param {String} cmd
   * @param {ChatHandler} handler
   */
  static tryInvokeCommand(cmd, handler) {
    try {
      const chatcmd = global.cmdList[cmd[0].toLowerCase()];
      chatcmd(cmd.slice(1), handler);
    } catch (err) {
      console.error(err);
      handler.sendChat(handler.chatType.System, "명령어 사용 실패");
    }
  }
}

module.exports = GameUtil;

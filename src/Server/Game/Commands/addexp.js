const { SmartBuffer } = require("smart-buffer");
const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  const exp = args[0];

  //handler.gameHandler.handleCharacterInfo(true);
  //handler.gameHandler.writeBuffer("0x0337", "5C 0E 2B 27 00 00 00 00 68 01 F3 02 00 00 00 00", () => {});
  const buf = new SmartBuffer().writeUInt32LE(657133148).writeUInt32LE(0).writeUInt32LE(exp).writeUInt32LE(0).toBuffer();
  handler.gameHandler.write("0x0337", buf);

  handler.sendChat(handler.chatType.System, `유저 ${handler.gameHandler._session.character.characterID}에게 경험치 ${exp}를 추가했습니다!`, false);
}

module.exports = execute;

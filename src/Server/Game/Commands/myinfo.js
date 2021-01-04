const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  const char = handler.gameHandler._session.character;

  handler.sendChat(
    handler.chatType.Server,
    `${char.userName}님의 정보 [계정: ${char.accountKey} / 캐릭터: ${char.characterID} / 맵: ${char.mapID} / 채널: ${char.channel.id} / BLOCK: ${char.block}]`,
    false
  );
}

module.exports = execute;

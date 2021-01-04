const CharacterClass = require("../../../Utils/structs/Characters/Classes/CharacterClass");
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
    `현재 ${char.userName}님의 위치는 ${char.position.x}, ${char.position.y}, ${char.position.z} ,${char.position.rotation} 입니다`,
    false
  );
}

module.exports = execute;

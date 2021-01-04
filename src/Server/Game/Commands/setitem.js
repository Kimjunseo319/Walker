const CharacterClass = require("../../../Utils/structs/Characters/Classes/CharacterClass");
const FashionItem = require("../../../Utils/structs/Items/FashionItem");
const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  const char = handler.gameHandler._session.character;
  const item = new FashionItem(args[0], args[1], args[2], args[3], args[4]);
  char.fashionInv.setItem(item);

  char.block = false;

  handler.gameHandler.handleCharacterInfo();
}

module.exports = execute;

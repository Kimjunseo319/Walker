const { SmartBuffer } = require("smart-buffer");
const CharacterClass = require("../../../Utils/structs/Characters/Classes/CharacterClass");
const ChatHandler = require("../Handlers/ChatHandler");
const GestureHandler = require("../Handlers/GestureHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  const id = args[0];
  const char = handler.gameHandler._session.character;

  const res = new SmartBuffer()
    .writeUInt32LE(char.characterID)
    .writeUInt32LE(id)
    .writeFloatLE(char.position.x)
    .writeFloatLE(char.position.y)
    .writeFloatLE(char.position.z)
    .writeUInt32LE(3266281424)
    .writeFloatLE(char.position.rotation);

  handler.gameHandler.write("0x2301", res.toBuffer());
}

module.exports = execute;

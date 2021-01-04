const CharacterClass = require("../../../Utils/structs/Characters/Classes/CharacterClass");
const Position = require("../../../Utils/structs/Characters/Position");
const ChatHandler = require("../Handlers/ChatHandler");

/**
 *
 * @param {Array} args
 * @param {ChatHandler} handler
 */
function execute(args, handler) {
  const map = args[0];
  const x = args[1];
  const y = args[2];
  const z = args[3];
  const rot = !args[4] ? 0 : args[4];

  const char = handler.gameHandler._session.character;

  char.position = new Position(x, y, z, rot);

  const chatcmd = global.cmdList["warp"];

  chatcmd([args[0]], handler);
}

module.exports = execute;

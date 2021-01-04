const { SmartBuffer } = require("smart-buffer");
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

  const char = handler.gameHandler._session.character;

  char.mapID = getMapID(map);

  if (args[1] === "true") char.position = getMapDefaultPos(map);

  char.block = false;

  const res = new SmartBuffer()
    .writeUInt32LE(char.characterID)
    .writeUInt32LE(0)
    .writeBigUInt64LE(BigInt(131335))
    .writeUInt32LE(0)
    .writeUInt16LE(102)
    .writeUInt8(0)
    .writeUInt8(1)
    .writeUInt16LE(char.mapID)
    .writeUInt16LE(7)
    .writeBigUInt64LE(BigInt(0))
    .writeUInt16LE("127.0.0.1".length)
    .writeString("127.0.0.1", "utf-8")
    .writeUInt16LE(10200)
    .writeInt16LE(-1)

    .writeBigUInt64LE(BigInt(0))
    .writeBuffer(char.position.toBuffer())
    .writeUInt32LE(262144)
    .writeBigUInt64LE(BigInt(0))
    .writeUInt16LE(256)
    .toBuffer();

  handler.gameHandler.write("0x0402", res);
}

function getMapDefaultPos(str) {
  switch (str) {
    case "로코":
      return new Position(10000, 10000, 1000, 0);
    case "캔더스":
      return new Position(80000, 76000, 3000, 0);
    case "그레이스":
      return new Position(42000, 46000, 4000, 0);
    case "6구역":
      return new Position(40000, 40000, 12000, 0);
    case "디플루스":
      return new Position(53651, 44072, 28561, 90);
    case "로드":
      return new Position(16000, 9000, 1200, 0);
    default:
      return new Position(0, 0, 0, 0);
  }
}

function getMapID(str) {
  switch (str) {
    case "로코":
      return 10003;
    case "캔더스":
      return 10021;
    case "그레이스":
      return 10031;
    case "루인":
      return 10041;
    case "잔디":
      return 10101;
    case "디플루스":
      return 10061;
    case "로드":
      return 10071;
    case "6구역":
      return 30021;
    default:
      return Number(str);
  }
}

module.exports = execute;

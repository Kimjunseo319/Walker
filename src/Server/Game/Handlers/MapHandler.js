const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class MapHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  teleportMap() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const mapID = buf.readUInt16LE(13);
    const char = this.gameHandler._session.character;
    char.block = false;
    char.mapID = mapID;
    const res = new SmartBuffer()
      .writeUInt32LE(char.characterID)
      .writeUInt32LE(0)
      .writeBigUInt64LE(BigInt(131335))
      .writeUInt32LE(0)
      .writeUInt16LE(102)
      .writeUInt8(0)
      .writeUInt8(1)
      .writeUInt16LE(mapID)
      .writeUInt16LE(7)
      .writeBigUInt64LE(BigInt(0))
      .writeUInt16LE("127.0.0.1".length)
      .writeString("127.0.0.1", "utf-8")
      .writeUInt16LE(10200)
      .writeInt16LE(-1)
      .writeBigUInt64LE(BigInt(0))
      .writeBuffer(char.position.toBuffer())
      //.writeUInt32LE(262400)
      .writeUInt32LE(262144)
      .writeBigUInt64LE(BigInt(0))
      .writeUInt16LE(256)
      .toBuffer();

    this.gameHandler.write("0x0402", res);
  }

  findDefaultPosition() {}
}

module.exports = MapHandler;

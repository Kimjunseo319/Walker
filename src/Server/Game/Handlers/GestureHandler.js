const { SmartBuffer } = require("smart-buffer");
const Position = require("../../../Utils/structs/Characters/Position");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class GestureHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  execute() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);

    const id = buf.readUInt32LE();
    const pos = Position.fromBuffer(buf);
    const unk = buf.readUInt32LE();
    pos.rotation = buf.readFloatLE();

    const res = new SmartBuffer()
      .writeUInt32LE(this.gameHandler._session.character.characterID)
      .writeUInt32LE(id)
      .writeFloatLE(pos.x)
      .writeFloatLE(pos.y)
      .writeFloatLE(pos.z)
      .writeUInt32LE(unk)
      .writeFloatLE(pos.rotation);

    this.gameHandler.write("0x2301", res.toBuffer());
  }

  executeWeapon() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);

    const charID = buf.readUInt32LE();
    const pos = Position.fromBuffer(buf);
    pos.rotation = buf.readFloatLE();
    const status = buf.readUInt32LE(); //1 - On / 0 - Off
    const unk = buf.readUInt32LE();
  }
}

module.exports = GestureHandler;

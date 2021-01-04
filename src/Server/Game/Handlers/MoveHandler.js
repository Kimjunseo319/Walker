const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

const Map = require("../../../Utils/structs/World/Map");
const Position = require("../../../Utils/structs/Characters/Position");

class MoveHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  movementStart() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const charID = buf.readUInt32LE();
    const unk1 = buf.readUInt16LE();
    const map = Map.fromBuffer(buf);
    const pos = Position.fromBuffer(buf);
    pos.rotation = buf.readFloatLE();
    const pos2 = Position.fromBuffer(buf);
    pos2.rotation = buf.readFloatLE();

    console.log({ ID: charID, unk1: unk1, map: map, pos: pos, pos2: pos2 });

    this.gameHandler.write("0x0501", this.gameHandler._data);
  }

  movementEnd() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const charID = buf.readUInt32LE();
    const unk1 = buf.readUInt16LE();
    const map = Map.fromBuffer(buf);
    const pos = Position.fromBuffer(buf);
    pos.rotation = buf.readFloatLE();
    const pos_unk = buf.readFloatLE();
    const result = buf.readUInt8();

    this.gameHandler._session.character.position = pos;

    this.gameHandler.write("0x0503", this.gameHandler._data);
  }

  movementJump() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);

    this.gameHandler.write("0x0505", this.gameHandler._data);
  }
}

module.exports = MoveHandler;

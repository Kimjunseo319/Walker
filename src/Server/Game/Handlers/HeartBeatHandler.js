const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class HeartBeatHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handle() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const data = {
      type: "heartBeat",
      unkTick: buf.readBigUInt64LE(), //unk1: buf.readUInt32LE(), unk2: buf.readUInt32LE(),
      unk3: buf.readUInt32LE(),
      unk4: buf.readUInt32LE(),
      unk5: buf.readUInt32LE(),
    };

    this.gameHandler.write("0x0106", new SmartBuffer().writeBigUInt64LE(data.unkTick).toBuffer());
  }
}

module.exports = HeartBeatHandler;

const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class RankHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handle() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    console.log({ unk1: buf.readUInt32LE(), charID: buf.readUInt32LE(), rankType: buf.readUInt16LE(), unk2: buf.readUInt16LE() });
  }
}

module.exports = RankHandler;

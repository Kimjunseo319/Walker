const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../../GameHandler");

class MemoHandler {
  MemoType = {
    Party: 0,
    League: 1,
    Friend: 2,
    Solo: 3,
    Newbie: 4,
    AFK: 5,
  };

  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handle() {
    //0x0377
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const type = buf.readUInt8();
    const comment = buf.readString(buf.readUInt16LE(), "utf16le");
    const memo = buf.readString(buf.readUInt16LE(), "utf16le");
    console.log(type, comment, memo);
  }
}

module.exports = MemoHandler;

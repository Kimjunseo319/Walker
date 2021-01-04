const { SmartBuffer } = require("smart-buffer");
const CharacterClass = require("../../../Utils/structs/Characters/Classes/CharacterClass");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class ChannelHandler {
  trafficStatus = {
    Fast: 0,
    Normal: 1,
    Slow: 2,
    VerySlow: 3,
  };

  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handleChannelInfo() {
    const char = this.gameHandler._session.character;
    const res = new SmartBuffer().writeUInt16LE(char.mapID).writeUInt8(16); //channel count

    for (let i = 1; i < 17; i++) {
      res
        .writeUInt16LE(i) //채널
        .writeUInt8(this.trafficStatus.Fast); //혼잡도
    }

    this.gameHandler.write("0xF101", res.toBuffer());

    //TODO: CHANNEL SYSTEM
  }

  handleChannelChange() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const id = buf.readUInt16LE();
  }
}

module.exports = ChannelHandler;

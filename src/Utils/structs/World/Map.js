const { SmartBuffer } = require("smart-buffer");

class Map {
  constructor(mapID, unk1 = 256, unk2 = 7) {
    this.mapID = mapID;
    this.unk1 = unk1;
    this.unk2 = unk2;

    //TODO: validate map ID
  }

  toBuffer() {
    return new SmartBuffer().writeUInt16LE(this.unk1).writeUInt16LE(this.mapID).writeUInt16LE(this.unk2).toBuffer();
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const unk1 = buf.readUInt16LE();
    const mapID = buf.readUInt16LE();
    const unk2 = buf.readUInt16LE();
    return new Map(mapID, unk1, unk2);
  }
}

module.exports = Map;

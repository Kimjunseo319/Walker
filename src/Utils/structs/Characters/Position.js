const { SmartBuffer } = require("smart-buffer");

class Position {
  constructor(x, y, z, rotation) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation = rotation;
  }

  toBuffer() {
    return new SmartBuffer().writeFloatLE(this.x).writeFloatLE(this.y).writeFloatLE(this.z).writeFloatLE(this.rotation).toBuffer();
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    return new Position(buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE(), 0);
  }
}

module.exports = Position;

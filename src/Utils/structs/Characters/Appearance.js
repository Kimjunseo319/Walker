const { SmartBuffer } = require("smart-buffer");

class Appearance {
  constructor() {
    this.fashions = {
      hair: 0,
    };
    this.colors = {
      hair: 0,
      eye: 0,
      skin: 0,
    };
  }

  setFashions(hair) {
    this.fashions = {
      hair: hair,
    };
    return this;
  }

  getFashions() {
    return this.fashions;
  }

  setColors(hair, eye, skin) {
    this.colors = {
      hair: hair,
      eye: eye,
      skin: skin,
    };
    return this;
  }

  getColors() {
    return this.colors;
  }

  toBuffer() {
    return new SmartBuffer()
      .writeUInt16LE(this.fashions.hair)
      .writeUInt16LE(this.colors.hair)
      .writeUInt16LE(this.colors.eye)
      .writeUInt16LE(this.colors.skin)
      .toBuffer();
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const hair = buf.readUInt16LE();
    const hairColor = buf.readUInt16LE();
    const eyeColor = buf.readUInt16LE();
    const skinColor = buf.readUInt16LE();

    return new Appearance().setFashions(hair).setColors(hairColor, eyeColor, skinColor);
  }
}

module.exports = Appearance;

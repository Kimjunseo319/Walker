const { SmartBuffer } = require("smart-buffer");
const Item = require("./Item");

class WeaponItem extends Item {
  constructor(itemID, upgrade) {
    super(itemID);
    this.upgrade = upgrade;
  }

  toBuffer() {
    return new SmartBuffer().writeUInt8(this.upgrade).writeInt32LE(this.ID).toBuffer();
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const upgrade = buf.readUInt8();
    return new WeaponItem(buf.readInt32LE(), upgrade);
  }

  static getDefaultWeapon(classType) {
    return new WeaponItem(110011301 + 1000000 * classType, 0);
  }
}

module.exports = WeaponItem;

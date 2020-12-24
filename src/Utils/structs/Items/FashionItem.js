const { SmartBuffer } = require("smart-buffer");
const Item = require("./Item");

class FashionItem extends Item {
  /**
   *
   * @param {Number} unk1 unknown
   * @param {Number} unk2 unknown
   * @param {Number} id item ID
   * @param {Number} dye item Dye
   */

  constructor(unk1, unk2, id, dye, pos = -1) {
    super(id);
    this.unk1 = unk1;
    this.unk2 = unk2;
    this.dye = dye;
    this.pos = pos;
    console.log(`[FashionItem]Fashion Item is created!`, this);
  }

  toBuffer() {
    return new SmartBuffer()
      .writeInt32LE(this.unk1)
      .writeInt32LE(this.unk2)
      .writeInt32LE(this.ID)
      .writeUInt32LE(this.dye)
      .writeInt32LE(-1) //unk
      .writeInt32LE(-1) //unk
      .writeInt32LE(-1) //unk
      .writeUInt32LE(0) //unk
      .toBuffer();
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const unk1 = buf.readInt32LE();
    const unk2 = buf.readInt32LE();
    const ID = buf.readInt32LE();
    const dye = buf.readUInt32LE();

    buf.readOffset += 16; //TODO: 여기 읽어야함
    //16칸 아무래도 덧입는 옷 같은데...

    return new FashionItem(unk1, unk2, ID, dye);
  }
}

module.exports = FashionItem;

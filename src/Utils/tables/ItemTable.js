const Table = require("./Table");

class ItemTable extends Table {
  loadDataT() {
    this.id = this.buf.readUInt32LE();
    this.class = this.buf.readUInt32LE();

    return this;
  }
  loadData() {
    try {
      this.id = this.buf.readUInt32LE();

      this.classification = this.buf.readInt32LE();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt16LE();
      this.sellPrice = this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt16LE();
      this.buf.readInt8();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.levelReq = this.buf.readInt16LE();
      this.character = this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt32LE(); // ??
      this.unknown1 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");

      this.durability = this.buf.readInt8();
      this.buf.readInt8();

      this.damageMin = this.buf.readInt32LE();
      this.damageMax = this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.defenceMin = this.buf.readInt32LE();
      this.defenceMax = this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt8();
      this.statId1 = this.buf.readInt32LE();
      this.statId2 = this.buf.readInt32LE();
      this.statId3 = this.buf.readInt32LE();
      this.statId4 = this.buf.readInt32LE();
      this.statId5 = this.buf.readInt32LE();
      this.statValue1 = this.buf.readInt32LE();
      this.statValue2 = this.buf.readInt32LE();
      this.statValue3 = this.buf.readInt32LE();
      this.statValue4 = this.buf.readInt32LE();
      this.statValue5 = this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt16LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt32LE();
      this.buf.readInt16LE();
      this.buf.readInt32LE();
      this.buf.readInt16LE();
      this.buf.readInt32LE();
      this.buf.readInt8();
      this.buf.readInt16LE();
      this.buf.readInt32LE();
      this.buf.readInt16LE();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt32LE();
      this.buf.readInt8();
      this.buf.readInt32LE();
      this.buf.readInt8();
      this.buf.readInt8();
      this.buf.readInt32LE();

      return this;
    } catch (err) {
      console.error(err);
      console.log(this);
    }
  }
}

module.exports = ItemTable;

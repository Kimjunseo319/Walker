const Table = require("./Table");

class SkillTable extends Table {
  loadData() {
    try {
      this.id = this.buf.readUInt32LE();
      this.one = this.buf.readInt16LE();
      this.unk1 = this.buf.readBigInt64LE();
      this.unk2 = this.buf.readInt8();
      this.unk3 = this.buf.readInt8();
      this.unk4 = this.buf.readBigInt64LE();
      this.unk5 = this.buf.readBigInt64LE();
      this.unk6 = this.buf.readBigInt64LE();
      this.unk7 = this.buf.readBigInt64LE();
      this.unk8 = this.buf.readInt16LE();
      this.unk9 = this.buf.readInt32LE();
      this.unk10 = this.buf.readInt16LE();
      this.unk11 = this.buf.readInt32LE();
      this.unk12 = this.buf.readInt32LE();
      this.unk13 = this.buf.readBigInt64LE();
      this.unk14 = this.buf.readBigInt64LE();
      this.unk15 = this.buf.readBigInt64LE();
      this.unk16 = this.buf.readBigInt64LE();
      this.unk17 = this.buf.readInt32LE();
      this.unk18 = this.buf.readInt16LE();
      this.unk19 = this.buf.readInt32LE();
      this.unk20 = this.buf.readInt8();
      this.unk21 = this.buf.readBigInt64LE();
      this.unk22 = this.buf.readInt32LE();
      this.unk23 = this.buf.readInt32LE();
      this.unk24 = this.buf.readInt8();
      this.unk25 = this.buf.readInt16LE();
      this.unk26 = this.buf.readInt16LE();
      this.unk27 = this.buf.readInt16LE();

      return this;
    } catch (err) {
      console.error(err);
      console.log(this);
    }
  }
}

module.exports = SkillTable;

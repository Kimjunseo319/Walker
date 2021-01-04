const Table = require("./Table");

class GestureTable extends Table {
  loadData() {
    this.id = this.buf.readUInt16LE();
    this.class = this.buf.readUInt8();
    this.unk2 = this.buf.readInt8();
    this.unk3 = this.buf.readInt8();
    this.unk4 = this.buf.readUInt32LE();
    this.unk5 = this.buf.readUInt16LE();
    this.unk6 = this.buf.readUInt32LE();
    this.unk7 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk8 = this.buf.readInt8();
    this.unk9 = this.buf.readUInt32LE();
    this.unk10 = this.buf.readUInt32LE();
    this.unk11 = this.buf.readUInt32LE();
    this.unk12 = this.buf.readUInt32LE();
    this.unk13 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk14 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk15 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk16 = this.buf.readUInt32LE();
    this.unk17 = this.buf.readUInt16LE();
    this.unk18 = this.buf.readUInt16LE();
    return this;
  }

  static finish(arr) {
    console.log(arr);
  }
}

module.exports = GestureTable;

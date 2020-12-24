const Table = require("./Table");

class ItemScriptTable extends Table {
  loadData() {
    this.id = this.buf.readUInt32LE();
    this.icon = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk1 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk2 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk3 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk4 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk5 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk6 = this.buf.readInt8();
    this.unk7 = this.buf.readInt8();
    this.unk8 = this.buf.readInt8();
    this.unk9 = this.buf.readInt8();
    this.unk10 = this.buf.readInt8();
    this.name = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.description = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    return this;
  }

  static finish(arr) {
    console.log(arr);
  }
}

module.exports = ItemScriptTable;

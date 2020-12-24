const Table = require("./Table");

class ClassInfoTable extends Table {
  loadData() {
    this.id = this.buf.readUInt8();
    this.unk5 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk6 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk7 = this.buf.readUInt32LE();
    this.unk8 = this.buf.readUInt32LE();
    this.unk9 = this.buf.readUInt32LE();
    this.unk10 = this.buf.readUInt32LE();
    this.unk11 = this.buf.readUInt32LE();
    this.handsFashionId = this.buf.readUInt32LE();
    this.unk13 = this.buf.readUInt32LE();
    this.outerwearFashionId = this.buf.readUInt32LE();
    this.unk15 = this.buf.readUInt32LE();
    this.stockingsFashionId = this.buf.readUInt32LE();
    this.shoesFashionId = this.buf.readUInt32LE();
    this.unk18 = this.buf.readUInt32LE();
    this.unk19 = this.buf.readUInt32LE();
    this.unk20 = this.buf.readUInt16LE();
    this.unk21 = this.buf.readUInt16LE();
    this.unk22 = this.buf.readInt32LE();
    this.unk23 = this.buf.readUInt16LE();
    this.unk24 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk25 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk26 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk27 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk28 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk29 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");

    //console.log(`[PhotoTable] ${this.charSelectImg}(${this.id}, ${this.classification}) photo has been added!`);

    return this;
  }

  static finish(arr) {
    console.log(`[ClassInfoTable] ${arr.length} char added!`);
  }
}

module.exports = ClassInfoTable;

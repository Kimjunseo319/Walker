const Table = require("./Table");

class ItemTable extends Table {
  loadData() {
    this.id = this.buf.readUInt32LE();
    this.unk0 = this.buf.readUInt32LE();
    this.unk1 = this.buf.readInt8();
    this.maxSlot = this.buf.readInt8();
    this.unk2 = this.buf.readUInt16LE();
    this.price = this.buf.readUInt32LE();
    this.unk3 = this.buf.readUInt32LE();
    this.unk4 = this.buf.readUInt32LE();
    this.unk5 = this.buf.readUInt32LE();
    this.maxStack = this.buf.readUInt16LE();
    this.unk6 = this.buf.readInt8();
    this.unk7 = this.buf.readUInt32LE();
    this.unk8 = this.buf.readUInt32LE();
    this.info = this.buf.readUInt32LE();
    this.minLevel = this.buf.readUInt16LE();
    this.class = this.buf.readInt8();
    this.unk9 = this.buf.readInt8();
    this.unk10 = this.buf.readInt8();
    this.unk11 = this.buf.readInt8();
    this.costumeSet = this.buf.readUInt32LE();
    this.broochSlot = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.durability = this.buf.readInt8();
    this.unk12 = this.buf.readInt8();
    this.minAttackDamange = this.buf.readUInt32LE();
    this.maxAttackDamage = this.buf.readUInt32LE();
    this.unk13 = this.buf.readUInt32LE();
    this.minDefence = this.buf.readUInt32LE();
    this.maxDefence = this.buf.readUInt32LE();
    this.unk14 = this.buf.readUInt32LE();
    this.unk15 = this.buf.readInt8();
    this.unk16 = this.buf.readInt8();
    this.unk17 = this.buf.readInt8();
    this.unk18 = this.buf.readInt8();
    this.unk19 = this.buf.readInt8();
    this.stat = this.readunk();
    this.unk20 = this.buf.readUInt32LE();
    this.unk21 = this.buf.readUInt32LE();
    this.unk22 = this.buf.readUInt32LE();
    this.unk23 = this.buf.readUInt16LE();
    this.unk24 = this.buf.readUInt32LE();
    this.unk25 = this.buf.readUInt32LE();
    this.unk26 = this.buf.readUInt32LE();
    this.unk27 = this.buf.readUInt16LE();
    this.unk28 = this.buf.readUInt32LE();
    this.unk29 = this.buf.readUInt16LE();
    this.unk30 = this.buf.readUInt32LE();
    this.unk31 = this.buf.readInt8();
    this.unk32 = this.buf.readUInt16LE();
    this.unk33 = this.buf.readUInt32LE();
    this.unk34 = this.buf.readUInt16LE();
    this.unk35 = this.buf.readInt8();
    this.unk36 = this.buf.readInt8();
    this.unk37 = this.buf.readUInt32LE();
    this.unk38 = this.buf.readInt8();
    this.unk39 = this.buf.readUInt32LE();
    this.unk40 = this.buf.readInt8();
    this.unk41 = this.buf.readInt8();
    this.unk42 = this.buf.readUInt32LE();
    this.unk43 = this.buf.readUInt32LE();
    return this;
  }
  readunk() {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      const id = this.buf.readUInt32LE();
      const value = this.buf.readInt32LE();
      arr.push({ id: id, value: value });
    }
    return arr;
  }
  static finish(arr) {
    console.log(arr);
  }
}

module.exports = ItemTable;

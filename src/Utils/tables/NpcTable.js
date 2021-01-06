const Table = require("./Table");

class NpcTable extends Table {
  loadData() {
    this.vID = this.buf.readUInt32LE();
    this.unk1 = this.buf.readUInt16LE();
    this.unk2 = this.buf.readInt8();
    this.unkStr1 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk3 = this.buf.readUInt32LE();
    this.unk4 = this.buf.readUInt32LE();
    this.unk5 = this.buf.readUInt32LE();
    this.unk6 = this.buf.readUInt32LE();
    this.unk7 = this.buf.readUInt32LE();
    this.unk8 = this.buf.readInt8();
    this.ID = this.buf.readUInt32LE();
    this.unk9 = this.buf.readInt8();
    this.unk10 = this.buf.readInt8();
    this.unk11 = this.buf.readUInt32LE();
    this.unk12 = this.buf.readInt8();
    this.unk13 = this.buf.readUInt32LE();
    this.unk14 = this.buf.readInt8();
    this.unk15 = this.buf.readUInt32LE();
    this.unk16 = this.buf.readUInt16LE();
    this.unk17 = this.buf.readUInt16LE();
    this.unk18 = this.buf.readUInt16LE();
    this.unk19 = this.buf.readInt8();
    this.unk20 = this.buf.readInt8();
    this.unk21 = this.buf.readInt8();
    this.unk22 = this.buf.readInt8();
    this.unk23 = this.buf.readInt8();
    this.unk24 = this.buf.readInt8();
    this.unk25 = this.buf.readUInt16LE();
    this.unk26 = this.buf.readUInt16LE();
    this.unk27 = this.buf.readUInt16LE();
    this.unkStr2 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk28 = this.buf.readInt8();
    this.unk29 = this.buf.readUInt32LE();
    this.unk30 = this.buf.readUInt32LE();
    this.unkStr3 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk31 = this.buf.readUInt16LE();
    this.unk32 = this.buf.readUInt16LE();
    this.unk33 = this.buf.readUInt16LE();
    this.unk34 = this.buf.readUInt16LE();
    this.unk35 = this.buf.readUInt16LE();
    this.unk36 = this.buf.readUInt16LE();
    this.unk37 = this.buf.readUInt16LE();
    this.unk38 = this.buf.readUInt16LE();
    this.unk39 = this.buf.readUInt16LE();
    this.unk40 = this.buf.readUInt16LE();
    this.unk41 = this.buf.readUInt16LE();
    this.unk42 = this.buf.readUInt16LE();
    this.unk43 = this.buf.readUInt16LE();
    this.unk44 = this.buf.readUInt16LE();
    this.unk45 = this.buf.readUInt16LE();
    this.unk46 = this.buf.readUInt16LE();
    this.unkStr4 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unkStr5 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unkStr6 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unkStr7 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unkStr8 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");

    return this;
  }

  static getNpc(vID) {
    if (global.tables.npcs === undefined) return null;
    const npc = global.tables.npcs.filter((npc) => {
      return npc.vID == vID;
    })[0];
    return npc;
  }

  static finish(arr) {
    console.log(`[NpcTable] ${arr.length} npcs added!`);
  }
}

module.exports = NpcTable;

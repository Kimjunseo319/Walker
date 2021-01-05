const Table = require("./Table");

class NpcTable extends Table {
  loadData() {
    this.vID = this.buf.readUInt32LE();
    this.unk9 = this.buf.readUInt16LE();
    this.unk = this.buf.readInt8();
    this.unk2 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk3 = this.buf.readUInt32LE();
    this.unk4 = this.buf.readUInt32LE();
    this.unk5 = this.buf.readUInt32LE();
    this.unk6 = this.buf.readUInt32LE();
    this.unk7 = this.buf.readUInt32LE();
    this.unk8 = this.buf.readInt8();
    this.ID = this.buf.readUInt32LE();
    this.unk10 = this.buf.readInt8();
    this.unk11 = this.buf.readInt8();
    this.unk12 = this.buf.readUInt32LE();
    this.unk13 = this.buf.readInt8();
    this.unk14 = this.buf.readUInt32LE();
    this.unk15 = this.buf.readInt8();
    this.unk16 = this.buf.readUInt32LE();
    this.unk17 = this.buf.readUInt16LE();
    this.unk18 = this.buf.readUInt16LE();
    this.unk19 = this.buf.readUInt16LE();
    this.unk20 = this.buf.readInt8();
    this.unk21 = this.buf.readInt8();
    this.unk22 = this.buf.readInt8();
    this.unk23 = this.buf.readInt8();
    this.unk24 = this.buf.readInt8();
    this.unk25 = this.buf.readInt8();
    this.unk26 = this.buf.readUInt16LE();
    this.unk27 = this.buf.readUInt16LE();
    this.unk28 = this.buf.readUInt16LE();
    this.unk29 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk30 = this.buf.readInt8();
    this.unk31 = this.buf.readUInt32LE();
    this.unk32 = this.buf.readUInt32LE();
    this.unk33 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
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
    this.unk47 = this.buf.readUInt16LE();
    this.unk48 = this.buf.readUInt16LE();
    this.unk49 = this.buf.readUInt16LE();
    this.unk50 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk51 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk52 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk53 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.unk54 = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");

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

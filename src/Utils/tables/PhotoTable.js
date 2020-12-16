const Table = require("./Table");

class PhotoTable extends Table {
  loadData() {
    this.id = this.buf.readUInt32LE();
    this.uid = this.buf.readUInt32LE();
    this.subID = this.buf.readInt16LE();
    this.mainImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.partyImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.partyoffImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.raidImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.adviceImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.cultivationImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.communityImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.charSelectImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.quickPartyImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.loadingImg = this.buf.readString(this.buf.readUInt16LE() * 2, "utf16le");
    this.classification = this.buf.readInt8();
    this.AdvanceRequire = this.buf.readInt8();

    //console.log(`[PhotoTable] ${this.charSelectImg}(${this.id}, ${this.classification}) photo has been added!`);

    return this;
  }

  static getPhoto(photoid) {
    if (global.tables.photos === undefined) return null;
    return global.tables.photos.filter((photo) => {
      return photo.id === photoid;
    });
  }

  static finish(arr) {
    console.log(`[PhotoTable] ${arr.length} photos added!`);
  }
}

module.exports = PhotoTable;

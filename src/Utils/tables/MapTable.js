const Table = require("./Table");

class MapTable extends Table {
  loadData() {
    this.id = this.buf.readUInt32LE();
    this.unknown1 = this.buf.readUInt16LE();
    this.unknown2 = this.buf.readUInt16LE();
    this.worldPathLen = this.buf.readUInt16LE() * 2;
    this.worldPath = this.buf.readString(this.worldPathLen, "utf16le");
    this.worldNameLen = this.buf.readUInt16LE() * 2;
    this.worldName = this.buf.readString(this.worldNameLen, "utf16le");
    this.unknown3 = this.buf.readUInt16LE();
    this.i1 = this.buf.readUInt32LE();
    this.i2 = this.buf.readUInt32LE();
    this.worldBGMLen = this.buf.readUInt16LE() * 2;
    this.worldBGM = this.buf.readString(this.worldBGMLen, "utf16le");
    this.worldGUILen = this.buf.readUInt16LE() * 2;
    this.worldGUI = this.buf.readString(this.worldGUILen, "utf16le");
    this.unknown4 = this.buf.readUInt8();
    this.unknown5 = this.buf.readUInt8();
    this.worldUnknownLen = this.buf.readUInt16LE() * 2;
    this.worldUnknown = this.buf.readString(this.worldUnknownLen, "utf16le");
    this.unknown6 = this.buf.readUInt8();
    this.unknown7 = this.buf.readUInt8();

    delete this.buf;
    console.log(`[MapTable] 맵 ${this.worldName}이 추가되었습니다!`);

    return this;
  }
}

module.exports = MapTable;

const { SmartBuffer } = require("smart-buffer");

class Guild {
  constructor() {
    //TODO: 길드 생성 코드 짜기
    this.guildID = 0;
    this.guildName = "길드이름";
    this.guildUser = [
      {
        username: "길마이름",
        position: "master",
      },
    ];
  }

  static Load() {
    return new Guild();
  }

  ToBuffer() {
    const buf = new SmartBuffer()
      .writeUInt32LE(this.guildID) //Uint64일수도있음
      .writeUInt32LE(0)
      .writeUInt32LE(1770496) //모르는거
      .writeBigUInt64LE(BigInt(6059)) //모르는거
      .writeUInt16LE(this.guildName.length * 2)
      .writeString(this.guildName, "utf16le")
      .writeBigUInt64LE(BigInt(704406)) //모르는거
      .writeBigUInt64LE(BigInt(1525677339)) //모르는거
      .writeBigUInt64LE(BigInt(1600594074)) //모르는거
      .writeUInt32LE(278387) //CHARID 일듯
      .writeUInt16LE(this.guildUser[0].username.length * 2)
      .writeString(this.guildUser[0].username, "utf16le")
      .writeUInt32LE(65536);

    return buf.toBuffer();
  }
}

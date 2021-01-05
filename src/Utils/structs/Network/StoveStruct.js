const { SmartBuffer } = require("smart-buffer");

class StoveStruct {
  /**
   *
   * @param {string} token
   * @param {string} mac
   * @param {string} version
   */
  constructor(token, mac, version) {
    this.token = token;
    this.mac = mac;
    this.version = version;
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const req = buf.readString(buf.readUInt16LE(), "utf16le");
    const jwt = req.split(".");
    const alg = JSON.parse(Buffer.from(jwt[0], "base64").toString("ascii"));
    const data = JSON.parse(Buffer.from(jwt[1], "base64").toString("ascii"));

    const token = { alg, data };

    buf.readOffset += 2; //Skip Separator

    const mac = buf.readString(buf.readUInt16LE(), "utf-8");

    buf.readOffset += 1026; //Skip Unk Data

    buf.readOffset += 18; //Skip Unk Data

    const version = buf.readString(buf.readUInt16LE());

    return new StoveStruct(token, mac, version);
  }
}

module.exports = StoveStruct;

const Session = require("../server/Sessions/Session");
const opCode = require("./opcode");
const packetHandler = require("./packetHandler");

class Handler {
  /**
   *
   * @param {Session} session
   */
  constructor(session) {
    this._session = session;
  }

  execute(opcode, data, cb) {}

  write(opcode, packet, cb) {
    const encryptData = {
      opcode: opcode,
      data: packet,
    };
    const packed = packetHandler.encrypt(encryptData);
    this._session.getClient().write(packed, cb);
  }

  writeRaw(packet, cb) {
    this._session.getClient().write(packet, cb);
  }

  writeBuffer(opcode, packet, cb) {
    const encryptData = {
      opcode: opcode,
      data: Buffer.from(packet.replace(/ /gi, ""), "hex"),
    };
    const packed = packetHandler.encrypt(encryptData);
    this._session.getClient().write(packed, cb);
  }
}

module.exports = Handler;

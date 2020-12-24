const { SmartBuffer } = require("smart-buffer");
const Handler = require("../../Utils/Handler");
const { opCode } = require("../../Utils/opcode");
const packetHandler = require("../../Utils/packetHandler");
const character = require("../Character/Util/character");

class GameHandler extends Handler {
  constructor(session) {
    super(session);
  }

  handleClientEnterGameServer() {}

  sendServerVersion(cb) {
    this._session.getClient().write(
      packetHandler.encrypt({
        opcode: "0x0404",
        data: new SmartBuffer().writeInt32LE(0).writeInt32LE(0).writeInt32LE(0).writeInt32LE(0).toBuffer(),
      }),
      () => {
        cb();
      }
    );
  }

  sendTimestamp(cb) {
    const date = new Date();
    const unixTime = BigInt(Math.floor(+date / 1000));
    const time = new SmartBuffer()
      .writeBigInt64LE(unixTime)
      .writeUInt16LE(date.getFullYear())
      .writeUInt16LE(date.getMonth() + 1)
      .writeUInt16LE(date.getDate())
      .writeUInt16LE(date.getHours())
      .writeUInt16LE(date.getMinutes())
      .writeUInt16LE(date.getSeconds())
      .writeUInt16LE(0);

    const encrypt = packetHandler.encrypt({ opcode: opCode.misc.ServerResCurrentDate, data: time.toBuffer() });
    this._session.getClient().write(encrypt, () => {
      cb();
    });
  }

  execute(opcode, data, loop = false) {
    this._opcode = opcode;
    this._data = data;

    switch (this._opcode) {
      case opCode.server.ClientReqWorldServerConnection:
        this.handleClientEnterGameServer();
        break;
      case opCode.character.ClientReqCharacterInfo:
        this.handleCharacterInfo();
        break;
      default:
        console.error("모르는거!", this._opcode, this._data.toString("hex"));
        break;
    }
  }
}
module.exports = GameHandler;

const { SmartBuffer } = require("smart-buffer");
const GameSession = require("../../../Server/Sessions/GameSession");

class Channel {
  static trafficStatus = {
    Fast: 0,
    Normal: 1,
    Slow: 2,
    VerySlow: 3,
  };

  constructor(id) {
    this.id = id;
    this.traffic = Channel.trafficStatus.Fast;
    this.sessions = [];
  }

  addSession(session) {
    this.sessions.push(session);
    console.log(`[Channel]${this.id}번 세션에 ${this.sessions}이 추가되었습니다!`);
  }

  findSession(client) {
    return this.sessions.filter((session) => {
      return session.getClient() === client;
    })[0];
  }

  destroySession(client) {
    this.sessions.filter((session) => {
      const ele = session.getClient() === client;
      if (ele) session = null;
      return ele;
    })[0];
  }

  /**
   *
   * @param {String} opcode
   * @param {Buffer} packet
   * @param {Function} cb
   */
  writeBroadcast(opcode, packet, cb = () => {}) {
    console.log(`[Channel-${this.id}] 채널 Broadcast 요청! 보낼 세션: ${this.sessions.length} [${opcode} ${packet.toString("hex")}]`);
    this.sessions.forEach((session) => {
      session.getHanlder().write(opcode, packet, cb);
    });
  }

  toBuffer() {
    return new SmartBuffer().writeUInt16LE(this.id).writeUInt8(this.traffic).toBuffer();
  }
}

module.exports = Channel;

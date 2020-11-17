const Session = require("../server/Sessions/Session");
const opCode = require("./opcode");

class Handler {
  /**
   *
   * @param {Session} session
   */
  constructor(session) {
    this._session = session;
  }

  execute(opcode, data) {}
}

module.exports = Handler;

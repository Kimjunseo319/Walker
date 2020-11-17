const Handler = require("../../Utils/Handler");
const CryptoUtil = require("bigint-crypto-utils");
const { Socket } = require("net");

class Session {
  /**
   *
   * @param {Socket} client
   */
  constructor(client) {
    this._client = client;
    global.SessionList.push(this);
    console.log(`[SessionManager] Session이 생성되었습니다!`, client);
  }

  getClient() {
    return this._client;
  }

  setClient(client) {
    this._client = client;
  }

  getAccountKey() {
    return this._accountKey;
  }

  setAccountKey(accountKey) {
    this._accountKey = accountKey;
  }

  getSessionKey() {
    return this._sessionKey;
  }

  setSessionKey(sessionKey) {
    this._sessionKey = sessionKey;
  }

  setRandomSessionKey() {
    //TODO: 좀더 완벽한 SessionKey 생성(BigUInt64 ㅎㅎ)
    const key = CryptoUtil.randBytesSync(8).readBigUInt64LE();
    if (!(-9223372036854775808n <= key && 9223372036854775808n > key)) {
      return this.setRandomSessionKey();
    }
    this._sessionKey = key;
  }

  /**
   * @returns {Handler}
   */
  getHanlder() {
    return this._handler;
  }

  setHandler(handlerType) {
    this._handler = new handlerType(this);
  }

  initSession() {}

  updateSession() {}

  destroySession() {
    console.log("[Session]현재 세션 리스트", global.SessionList);
    if (this.getClient()) {
      const idx = global.SessionList.findIndex((client) => client === this);
      if (idx > -1) {
        const delSession = global.SessionList.splice(idx, 1);
        console.log("[Session]세션이 파괴되었습니다", delSession);
      } else {
        console.error("[Session]세션 파괴에 실패하였습니다", idx, this);
      }
    } else {
      console.error("[Session]세션 파괴에 실패했습니다 (파괴할 세션을 찾을 수 없음)", this);
    }
  }

  /**
   *
   * @param {Socket} client
   * @returns {Session}
   */
  static getSession(client) {
    //TODO: 이부분에 치명적인 버그 있는 것 같음
    return global.SessionList.filter((session) => {
      console.log(session, session.getClient());
      return session.getClient() === client;
    })[0];
  }
}

module.exports = Session;

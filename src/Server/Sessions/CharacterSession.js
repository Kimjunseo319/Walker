const AccountModel = require("../../Utils/models/Account");
const CharacterModel = require("../../Utils/models/Character");
const Account = require("../../Utils/structs/Account");

const CharacterUtil = require("../Character/CharacterUtil");

const Session = require("./Session");

class CharacterSession extends Session {
  constructor(client) {
    super(client);
    this.account = null;
    this.characters = [];
    this.charBG = 1102;
    this.selected = 0;
  }

  //initSession({ accountKey, sessionKey }, cb) {
  /**
   *
   * @param {Number} accountKey
   * @param {Function} cb
   */
  initSession(accountKey, sessionKey, cb) {
    this.account = new Account(accountKey, () => {
      //this.account.sessionKey = sessionKey;

      this._accountKey = this.account.accountKey; //backward compatibility
      this._sessionKey = this.account.sessionKey; //backward compatibility

      this.charBG = this.account.characterBG;

      CharacterUtil.getCharacterList(accountKey, (chars) => {
        this.characters = chars;
        cb();
      });
    });
  }

  updateSession(cb) {
    this.account.updateAccount();
    CharacterUtil.getCharacterList(this._accountKey, (chars) => {
      this.characters = chars;
      cb();
    });
  }
}

module.exports = CharacterSession;

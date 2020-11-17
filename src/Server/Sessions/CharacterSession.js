const AccountModel = require("../../Utils/models/Account");
const CharacterModel = require("../../Utils/models/Character");

const Session = require("./Session");

class CharacterSession extends Session {
  constructor(client) {
    super(client);
    this.characters = [];
    this.selected = 0;
  }

  initSession({ accountKey, sessionKey }, cb) {
    this._accountKey = accountKey;
    this._sessionKey = sessionKey;
    AccountModel.findOne({ AccountKey: accountKey }, async (err, account) => {
      if (err) throw new Error(err);
      const chars = account.Characters;
      for (let i = 0, l = chars.length; i < l; i++) {
        const char = await CharacterModel.findOne({ ID: chars[i].CharID });
        this.characters.push({ index: chars[i].Index, char: char });
        const test = { index: chars[i].Index, char: char };
        console.log("[Character Session]캐릭터를 불러왔습니다!", test);
      }
      this.characters = this.characters.sort();
      console.log("[Character Session]캐릭터 리스트를 완성했습니다!", this.characters);
      cb();
    });
  }

  updateSession(cb) {
    AccountModel.findOne({ AccountKey: this.getAccountKey() }, async (err, account) => {
      if (err) throw new Error(err);
      this.characters = [];
      const chars = account.Characters;
      for (let i = 0, l = chars.length; i < l; i++) {
        const char = await CharacterModel.findOne({ ID: chars[i].CharID });
        this.characters.push({ index: chars[i].Index, char: char });
        const test = { index: chars[i].Index, char: char };
        console.log("[Character Session - Update]캐릭터를 불러왔습니다!", test);
      }
      this.characters = this.characters.sort();
      console.log("[Character Session - Update]캐릭터 리스트를 완성했습니다!", this.characters);
      cb();
    });
  }
}

module.exports = CharacterSession;

const AccountModel = require("../../Utils/models/Account");
const CharacterModel = require("../../Utils/models/Character");
const Session = require("./Session");

class GameSession extends Session {
  constructor(client) {
    super(client);
    this.character = {};
  }

  initSession(charID, cb) {
    console.log("[Game Session] 캐릭터" + charID + "을 불러오는 중입니다...");
    CharacterModel.findOne({ ID: charID }, (err, char) => {
      this.character = char;
      console.log("[Game Session] 캐릭터 " + char.UserName + "( " + char.ID + ")을 불러왔습니다!", this.character);
      cb();
    });
  }
}

module.exports = GameSession;

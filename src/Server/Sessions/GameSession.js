const AccountModel = require("../../Utils/models/Account");
const CharacterModel = require("../../Utils/models/Character");
const GameMap = require("../../Utils/structs/World/GameMap");
const CharacterUtil = require("../Character/CharacterUtil");
const Session = require("./Session");

class GameSession extends Session {
  constructor(client) {
    super(client);
    this.character = {};
  }

  async initSession(charID, accountID) {
    console.log("[Game Session] 캐릭터" + charID + "을 불러오는 중입니다...");
    const char = await CharacterUtil.getCharacterFromDB(charID, accountID);

    if (GameMap.getMap(char.mapID) !== null) {
      //TODO: 캐릭터 요청에 채널값 들어가있음
      const channel = GameMap.getMap(char.mapID).channels.getFastChannel();
      channel.addSession(this);
      char.channel = channel;
    }

    this.character = char;
    console.log("[Game Session] 캐릭터 " + char.userName + "( " + char.characterID + ")을 불러왔습니다!", this.character);
  }
}

module.exports = GameSession;

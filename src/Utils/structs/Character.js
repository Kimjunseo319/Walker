const CharacterDB = require("../models/Character");
class Character {
  /**
   *
   * @param {CharacterDB} charData
   */
  constructor(charData) {
    this.DB = charData;
    this.ID = charData.ID;
    this.name = charData.UserName;
  }

  async createCharacter() {}

  async editUserName(afterName) {
    const res = await CharacterDB.updateOne({ ID: this.ID + 1 }, { UserName: afterName });
    if (res.n == 0 && res.nModified == 0)
      console.error(
        `[Character(${this.ID})] Failed to change username! [SearchID: ${this.ID} / Change: ${this.name} -> ${afterName} / Details: n(${res.n}) nModified(${res.nModified})]`
      );
  }

  static async getCharacter(charID) {
    return new Character(await CharacterDB.findOne({ ID: charID }));
  }
}

module.exports = Character;

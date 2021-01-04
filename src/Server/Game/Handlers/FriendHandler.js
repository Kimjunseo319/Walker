const { SmartBuffer } = require("smart-buffer");
const CharacterDB = require("../../../Utils/models/Character");
const GameHandler = require("../GameHandler");

class FriendHandler {
  OnlineStatus = {
    Offline: 0,
    Online: 1,
  };

  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handle() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
  }

  async addFriend() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const name = buf.readString(buf.readUInt16LE(), "utf16le");
  }

  async findFriends() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    const name = buf.readString(buf.readUInt16LE(), "utf16le");

    const chars = await CharacterDB.find().where("UserName").regex(new RegExp(name));

    const res = new SmartBuffer().writeUInt16LE(chars.length); //len

    if (chars.length !== 0) {
      chars.forEach((char) => {
        res
          .writeUInt32LE(char.ID)
          .writeUInt16LE(char.UserName.length * 2)
          .writeString(char.UserName, "utf16le")
          .writeUInt8(19) //Offline
          .writeUInt16LE(0) //Offline
          .writeUInt8(0) //Offline
          .writeUInt8(0); //0 - Offline / 1 - Online
        //TODO: get on/offline from DB
      });
    }
    res
      .writeUInt8(chars.length === 0 ? 0 : 1) //Search Failed - 0 / Work - 1
      .writeUInt8(1); //Always - 1

    this.gameHandler.write("0x1933", res.toBuffer(), () => {});
  }
}

module.exports = FriendHandler;

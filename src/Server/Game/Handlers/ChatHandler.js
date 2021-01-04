const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class ChatHandler {
  chatType = {
    Normal: 1,
    Trade: 2,
    Party: 3,
    UNSAFE_League: 4,
    Whisper: 5,
    Server: 6,
    System: 7,
    megaphone: 13,
  };

  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  handleChat() {
    const buf = SmartBuffer.fromBuffer(this.gameHandler._data);
    console.log(buf.toString("hex"));
    const type = buf.readUInt8();

    const msg = buf.readString(buf.readUInt16LE(), "utf16le");
    console.log(msg);
    if (msg.startsWith(".") || msg.startsWith("/")) {
      GameUtil.tryInvokeCommand(msg.replace(/.|\//, "").split(" "), this);
    } else {
      this.sendChat(type, msg);
    }
  }

  /**
   *
   * @param {chatType} chatType
   * @param {String} msg
   * @param {boolean} isplayer
   */
  sendChat(chatType, msg, isplayer = true) {
    const buf = new SmartBuffer()
      .writeUInt32LE(isplayer ? this.gameHandler._session.character.characterID : 0)
      .writeUInt32LE(chatType)
      .writeUInt16LE(msg.length * 2)
      .writeString(msg, "utf16le")
      .toBuffer();

    const char = this.gameHandler._session.character;
    char.channel.writeBroadcast("0x0701", buf);
  }
}

module.exports = ChatHandler;

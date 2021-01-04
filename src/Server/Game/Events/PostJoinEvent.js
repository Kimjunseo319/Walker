const { SmartBuffer } = require("smart-buffer");
const Position = require("../../../Utils/structs/Characters/Position");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");
const ChatHandler = require("../Handlers/ChatHandler");

class PostJoinEvent {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  execute() {
    const chat = new ChatHandler(this.gameHandler);
    chat.sendChat(chat.chatType.Server, `Welcome to Server! ${this.gameHandler._session.character.userName}!`, false);
  }
}

module.exports = PostJoinEvent;

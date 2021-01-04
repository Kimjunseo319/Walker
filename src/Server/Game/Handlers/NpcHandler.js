const { SmartBuffer } = require("smart-buffer");
const Npc = require("../../../Utils/structs/VXml/structs/Npc");
const GameHandler = require("../GameHandler");
const GameUtil = require("../GameUtil");

class NpcHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  sendNpcs() {
    const char = this.gameHandler._session.character;
    const mapID = char.mapID;

    const npcs = Npc.getNpcs("F031_ROCCOTOWN");

    new SmartBuffer().writeUInt16LE(npcs.length);

    //TODO: IDK
  }
}

module.exports = NpcHandler;

const { SmartBuffer } = require("smart-buffer");
const GameHandler = require("../GameHandler");

class InventoryHandler {
  /**
   *
   * @param {GameHandler} gameHandler
   */
  constructor(gameHandler) {
    this.gameHandler = gameHandler;
  }

  /**
   *
   * @param {Number} invType
   */
  toBuffer(invType) {}
}

module.exports = InventoryHandler;

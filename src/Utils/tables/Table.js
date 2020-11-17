const { SmartBuffer } = require("smart-buffer");

class Table {
  /**
   *
   * @param {SmartBuffer} buf
   */
  constructor(buf) {
    this.buf = buf;
  }

  loadData() {}
}

module.exports = Table;

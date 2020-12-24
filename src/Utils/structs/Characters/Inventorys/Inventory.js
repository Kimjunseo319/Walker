class Inventory {
  static InventoryType = {
    Default: 0x00,
    Fashion: 0x03,
  };

  constructor(type) {
    this.type = type;
    this.inventory = [];
  }

  createDefaultInventory() {}

  createInventory() {}

  setItem() {}

  toBuffer() {}
}

module.exports = Inventory;

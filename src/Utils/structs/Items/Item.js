const TableReader = require("../../TableReader");
const ItemScriptTable = require("../../tables/ItemScriptTable");
const ItemTable = require("../../tables/ItemTable");

class Item {
  constructor(itemID) {
    this.ID = itemID;
    //TODO: Load item from table
  }

  setItem(itemID) {
    const items = TableReader.readTable("tb_Item", ItemTable);
    const scripts = TableReader.readTable("tb_item_script", ItemScriptTable);
    const arr = [];
    items.forEach((item) => {
      const find = scripts.filter((s) => {
        return s.id == item.id;
      });
      if (find.length !== 0) {
        const data = { item: item, script: find[0] };
        arr.push(data);
      }
    });
  }

  toBuffer() {}

  fromBuffer(buf) {}
}

module.exports = Item;

const FashionItem = require("../../Items/FashionItem");
const Inventory = require("./Inventory");

const option = require("../../../../../option.json");
const { SmartBuffer } = require("smart-buffer");
const CharacterClass = require("../Classes/CharacterClass");

class FashionInventory extends Inventory {
  static FashionSlot = {
    Effect: 0, //이펙트
    unk2: 1,
    unk3: 2,
    unk4: 3,
    Gloves: 4, //장갑
    unk5: 5,
    Top: 6, //상의
    Hat: 7, //머리
    Stocking: 8, //스타킹
    Shoes: 9, //신발
    Weapon: 10, //무기
    Bottoms: 11, //하의
    unk13: 12,
    unk14: 13,
  };

  constructor() {
    super(Inventory.InventoryType.Fashion);
  }

  createDefaultInventory() {
    this.inventory = [];
    for (let i = 0; i < option.Constants.MAX_EQUIPPED_FASHION_INV; i++) {
      this.inventory.push(new FashionItem(-1, -1, -1, 0, i)); //dummy item
    }
    return this;
  }

  /**
   *
   * @param  {...FashionItem[]} items fashionItems
   */
  createInventory(items) {
    this.createDefaultInventory();

    items.forEach((item) => {
      if (item.pos === -1 || item.pos === undefined) {
        console.error(`[FashionItem]Item position value is ${item.pos}!!`);
        return null;
      }
      if (item.$init) {
        item = new FashionItem(item.unk1, item.unk2, item.ID, item.dye, item.pos);
      }
      this.inventory[item.pos] = item;
    });
    return this;
  }

  setItem(item) {
    if (item.pos === -1 || item.pos > this.inventory) throw new Error(`[Fashion Inventory] setItem is failed`);
    this.inventory[item.pos] = item;
    return this;
  }

  setDefaultClothes(classType, clothCode = 1) {
    const items = [
      new FashionItem(-1, -1, 201000701 + 10000000 * classType + 10000 * clothCode, 0, FashionInventory.FashionSlot.Top),
      new FashionItem(-1, -1, 201001101 + 10000000 * classType + 10000 * clothCode, 0, FashionInventory.FashionSlot.Stocking),
      new FashionItem(-1, -1, 201001201 + 10000000 * classType + 10000 * clothCode, 0, FashionInventory.FashionSlot.Shoes),
      new FashionItem(-1, -1, 201000801 + 10000000 * classType + 10000 * clothCode, 0, FashionInventory.FashionSlot.Bottoms),
    ];

    if (classType >= 7) {
      if (classType === 7) {
        items[0] = new FashionItem(-1, -1, 271005091, 0, FashionInventory.FashionSlot.Top);
        items[1] = new FashionItem(-1, -1, 271005051, 0, FashionInventory.FashionSlot.Gloves);
        items[2] = new FashionItem(-1, -1, 271005191, 0, FashionInventory.FashionSlot.Hat);
        items[3] = new FashionItem(-1, -1, 271005121, 0, FashionInventory.FashionSlot.Shoes);
        items[4] = new FashionItem(-1, -1, 271005111, 0, FashionInventory.FashionSlot.Stocking);
      } else if (classType === 8) {
        items[0] = new FashionItem(-1, -1, 281001091, 0, FashionInventory.FashionSlot.Top);
        items[1] = new FashionItem(-1, -1, 281001051, 0, FashionInventory.FashionSlot.Gloves);
        items[2] = new FashionItem(-1, -1, 281001121, 0, FashionInventory.FashionSlot.Shoes);
        delete items[3];
      } else if (classType === 9) {
        items[0] = new FashionItem(-1, -1, 293002091, 0, FashionInventory.FashionSlot.Top);
        items[1] = new FashionItem(-1, -1, 293002051, 0, FashionInventory.FashionSlot.Gloves);
        items[2] = new FashionItem(-1, -1, 293002111, 0, FashionInventory.FashionSlot.Stocking);
        items[3] = new FashionItem(-1, -1, 293002121, 0, FashionInventory.FashionSlot.Shoes);
      }
    }

    return this.createInventory(items);
  }

  toBuffer() {
    const buf = new SmartBuffer();
    this.inventory.forEach((item) => {
      buf.writeBuffer(item.toBuffer());
    });
    return buf.toBuffer();
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const items = [];
    for (let i = 0; i < option.Constants.MAX_EQUIPPED_FASHION_INV; i++) {
      const item = FashionItem.fromBuffer(buf);
      item.pos = i;
      items.push(item);
    }
    return new FashionInventory().createInventory(items);
  }
}

module.exports = FashionInventory;

const Stats = require("../Stats");
const Appearance = require("../Appearance");
const Gesture = require("../Gesture");
const Position = require("../Position");
const Skill = require("../Skills/Skill");
const SkillPreset = require("../Skills/SkillPreset");
const CharacterClass = require("./CharacterClass");
const PhotoTable = require("../../../tables/PhotoTable");
const WeaponItem = require("../../Items/WeaponItem");
const FashionInventory = require("../Inventorys/FashionInventory");
const FashionItem = require("../../Items/FashionItem");
const Session = require("../../../../Server/Sessions/Session");

class Leenabi extends CharacterClass {
  /**
   *
   * @param {Number} accountKey
   * @param {Appearance} appearance
   * @param {WeaponItem} weapon
   * @param {Number} photoid
   */
  constructor(accountKey, appearance, weapon = WeaponItem.getDefaultWeapon(CharacterClass.classTable.Leenabi), photoid = 1001) {
    const stat = new Stats()
      .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
      .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

    const photo = PhotoTable.getPhoto(photoid);

    const fashioninv = new FashionInventory();

    //fashioninv.setDefaultClothes(CharacterClass.classTable.Leenabi, 1);
    const fashions = [
      new FashionItem(92, 21806250, 291001051, 0, FashionInventory.FashionSlot.Gloves),
      new FashionItem(91, 21806250, 291001091, 0, FashionInventory.FashionSlot.Top),
      new FashionItem(94, 21806250, 291001111, 0, FashionInventory.FashionSlot.Shoes),
      new FashionItem(93, 21806250, 291001121, 0, FashionInventory.FashionSlot.unk11),
    ];
    fashioninv.createInventory(fashions);

    super(stat, new SkillPreset(), new Position(10000.0, 10000.0, 100.0, 0.0), appearance, photo, new Gesture(), weapon, fashioninv);

    this.accountKey = accountKey;
    this.classType = CharacterClass.classTable.Leenabi;
  }
}

module.exports = Leenabi;

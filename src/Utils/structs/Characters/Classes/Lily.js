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

class Lily extends CharacterClass {
  /**
   *
   * @param {Number} accountKey
   * @param {Appearance} appearance
   * @param {WeaponItem} weapon
   * @param {Number} photoid
   */
  constructor(accountKey, appearance, weapon = WeaponItem.getDefaultWeapon(CharacterClass.classTable.Lily), photoid = 1001) {
    const stat = new Stats()
      .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
      .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

    const photo = PhotoTable.getPhoto(photoid);

    const fashioninv = new FashionInventory();

    fashioninv.setDefaultClothes(CharacterClass.classTable.Lily, 1);

    super(stat, new SkillPreset(), new Position(41541.2, 45513.97, 4011.51, 0.0), appearance, photo, new Gesture(), weapon, fashioninv);

    this.accountKey = accountKey;
    this.classType = CharacterClass.classTable.Lily;
  }
}

module.exports = Lily;

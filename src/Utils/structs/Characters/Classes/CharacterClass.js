const Stats = require("../../Stats");
const SkillPreset = require("../Skills/SkillPreset");
const Position = require("../Position");
const Appearance = require("../Appearance");
const Gesture = require("../Gesture");

class CharacterClass {
  /**
   *
   * @param {Stats} stats
   * @param {SkillPreset} skillPreset
   * @param {Position} position
   * @param {Appearance} appearance
   * @param {Gesture} gesture
   */
  constructor(stats, skillPreset, position, appearance, gesture) {
    this.stats = stats;
    this.skillPreset = skillPreset;
    this.position = position;
    this.appearance = appearance;
    this.gesture = gesture;

    //Default Settings
    this.userName = "";
    this.accountKey = 0;

    this.level = 1;
    this.ClassAdvance = 0; //0 - Normal / 1 - First Advance / 2 - Desire Advance
    this.exp = 0;

    this.money = 0;
    this.aether = 0;
    this.bp = 0;

    this.energy = 200;
    this.extraEnergy = 0;

    this.mapID = 10003;
  }

  toBuffer() {}
}

module.exports = CharacterClass;

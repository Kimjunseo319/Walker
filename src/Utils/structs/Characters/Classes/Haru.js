const Stats = require("../../Stats");
const Appearance = require("../Appearance");
const Gesture = require("../Gesture");
const Position = require("../Position");
const Skill = require("../Skills/Skill");
const SkillPreset = require("../Skills/SkillPreset");
const CharacterClass = require("./CharacterClass");

class Haru extends CharacterClass {
  /**
   *
   * @param {Appearance} appearance
   */
  constructor(appearance) {
    const stat = new Stats()
      .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
      .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

    super(stat, new SkillPreset(), new Position(10000.0, 10000.0, 100.0, 0.0), appearance, new Gesture());
  }
}

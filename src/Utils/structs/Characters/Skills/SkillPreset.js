const Skill = require("./Skill");
const option = require("../../../../../option.json");

class SkillPreset {
  //TODO: create & validation skill preset
  constructor() {
    const skill = new Skill(0); //create dummy skill
    this.skillPreset = [
      [skill, skill, skill],
      [skill, skill, skill],
      [skill, skill, skill],
      [skill, skill, skill],
      [skill, skill, skill],
      [skill, skill, skill],
    ];
  }

  setPreset(preset) {
    this.skillPreset = preset;
  }

  getPreset() {
    if (this.skillPreset.length !== option.Constants.SKILL_PRESET_COL && this.skillPreset[0].length !== option.Constants.SKILL_PRESET_ROW) {
      console.error(
        `[SkillPreset] Skill Preset length does not match the setting [col: ${this.skillPreset.length}(${option.Constants.SKILL_PRESET_COL} / row: ${this.skillPreset[0].length}(${option.Constants.SKILL_PRESET_ROW}))]`
      );
      return null;
    }
    return this.skillPreset;
  }
}

module.exports = SkillPreset;

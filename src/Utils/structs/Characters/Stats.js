class Stats {
  /**
   * Sets the character's basic stats
   * @param {Number} health
   * @param {Number} defence
   * @param {Number} superarmor
   * @param {Number} attackMin
   * @param {Number} attackMax
   * @param {Number} critDmg
   * @param {Number} critChance
   * @param {Number} accuracy
   * @param {Number} evasionRate
   */
  setBaseStats(health, defence, superarmor, attackMin, attackMax, critDmg, critChance, accuracy, evasionRate) {
    this.baseStats = {
      health: health,
      defence: defence,
      superArmor: superarmor,
      attackMin: attackMin,
      attackMax: attackMax,
      criticalDamage: critDmg,
      criticalChance: critChance,
      accuracy: accuracy,
      evasionRate: evasionRate,
    };
    return this;
  }

  getBaseStats() {
    const check = this.#checkObjectEmpty(this.baseStats);
    if (check) {
      console.error(`[Stats] The base stat value is empty`, this.baseStats);
      return null;
    }
    return this.baseStats;
  }

  /**
   * Sets the character's grow(Per level) stats
   * @param {Number} health
   * @param {Number} defence
   * @param {Number} superarmor
   * @param {Number} attackMin
   * @param {Number} attackMax
   * @param {Number} critDmg
   * @param {Number} critChance
   * @param {Number} accuracy
   * @param {Number} evasionRate
   */
  setGrowStats(health, defence, superarmor, attackMin, attackMax, critDmg, critChance, accuracy, evasionRate) {
    this.growStats = {
      health: health,
      defence: defence,
      superArmor: superarmor,
      attackMin: attackMin,
      attackMax: attackMax,
      criticalDamage: critDmg,
      criticalChance: critChance,
      accuracy: accuracy,
      evasionRate: evasionRate,
    };
    return this;
  }

  getGrowStats() {
    const check = this.#checkObjectEmpty(this.growStats);
    if (check) {
      console.error(`[Stats] The base stat value is empty`, this.growStats);
      return null;
    }
    return this.growStats;
  }

  toBuffer() {}

  /**
   * check object is empty
   * @param {Object} obj
   */
  #checkObjectEmpty(obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined || value === "") return true;
    }
    return false;
  }
}

module.exports = Stats;

class Appearance {
  constructor() {
    this.fashions = {
      hair: 0,
    };
    this.colors = {
      hair: 0,
      eye: 0,
      skin: 0,
    };
    this.photo = null;
  }

  setFashions(hair) {
    this.fashions = {
      hair: hair,
    };
    return this;
  }

  getFashions() {
    return this.fashions;
  }

  setColors(hair, eye, skin) {
    this.colors = {
      hair: hair,
      eye: eye,
      skin: skin,
    };
    return this;
  }

  getColors() {
    return this.colors;
  }
}

module.exports = Appearance;

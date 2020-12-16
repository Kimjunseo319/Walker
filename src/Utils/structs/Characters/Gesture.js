const option = require("../../../../option.json");

class Gesture {
  constructor() {
    this.gestures = [];
    for (let i = 0; i < option.Constants.MAX_GESTURE_SLOT; i++) {
      this.gestures.push(7000 + i);
    }
  }

  setGesture() {
    //TODO: Load Gesture From DB
  }

  getGesture() {
    return this.gestures;
  }
}

module.exports = Gesture;

const Channels = require("../Network/Channels");
const Map = require("./Map");

const opiton = require("../../../../option.json");
const Position = require("../Characters/Position");

class GameMap {
  constructor(mapID, position) {
    this.map = new Map(mapID);
    this.channels = new Channels(this.map);
    this.position = position;
    this.vbatch = null;
    console.log(`[GameMap]GameMap ${this.map.mapID} is created!`);
  }

  getChannel(id) {
    return this.channels[id];
  }

  getChannels() {
    return this.channels;
  }

  /**
   *
   * @param {Number} mapID
   *
   * @return {GameMap}
   */
  static getMap(mapID) {
    if (global.gameMaps[mapID]) return global.gameMaps[mapID];
    return null;
  }

  static getMaps() {
    return global.gameMaps;
  }

  static createGameMapDefault() {
    Object.keys(opiton.District).forEach((key) => {
      const distirct = opiton.District[key];
      const pos = new Position(distirct.Position.x, distirct.Position.y, distirct.Position.z, distirct.Position.rotation);
      global.gameMaps[distirct.ID] = new GameMap(distirct.ID, pos);
      if (distirct.VBatch) global.gameMaps[distirct.ID].vbatch = distirct.VBatch;
    });
  }
}

module.exports = GameMap;

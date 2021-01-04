const { SmartBuffer } = require("smart-buffer");
const Channel = require("./Channel");

const option = require("../../../../option.json");
const Map = require("../World/Map");

class Channels {
  /**
   *
   * @param {Map} map
   */
  constructor(map) {
    this.map = map;
    this.channels = [];
    this.createDefaultChannels();
  }

  getChannel(id) {
    return this.channels[id - 1];
  }

  /**
   * @return {Channel}
   */
  getFastChannel() {
    //TODO: Need to improve
    return this.channels.find((channel) => channel.traffic <= 1);
  }

  createDefaultChannels() {
    console.log(option.District[this.map.mapID]);
    const channels = option.District[this.map.mapID] ? option.District[this.map.mapID].Channel : 20;
    for (let i = 0; i < channels; i++) {
      this.createChannel();
    }
  }

  createChannel() {
    this.channels.push(new Channel(this.channels.length));
  }

  toBuffer() {
    const res = new SmartBuffer().writeUInt16LE(this.map.mapID).writeUInt8(this.channels.length);
    this.channels.forEach((channel) => {
      res.writeUInt16LE(channel.id).writeUInt8(channel.traffic);
    });
    return res.toBuffer();
  }
}

module.exports = Channels;

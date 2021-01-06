const { SmartBuffer } = require("smart-buffer");
const NpcTable = require("../../../tables/NpcTable");
const Position = require("../../Characters/Position");

class Npc {
  /**
   *
   * @param {Number} id
   * @param {Number} vid
   * @param {Position} position
   * @param {Number} waypoint
   */
  constructor(id, vid, position, waypoint) {
    this.id = id;
    this.vID = vid;
    this.position = position;
    this.waypoint = waypoint;
  }

  toBuffer() {
    return (
      new SmartBuffer()
        .writeUInt16LE(this.id)
        .writeUInt16LE(8192)
        .writeBuffer(this.position.toBuffer())
        .writeUInt16LE(1150)
        .writeUInt16LE(0) //waypoint or spe?
        .writeBigUInt64LE(BigInt(this.waypoint)) //waypoint?
        //.writeBuffer(Buffer.alloc(10)) //waypoint?
        .writeUInt8(1) //visiablity?
        .writeUInt32LE(this.vID)
        .toBuffer()
    );
  }

  /**
   *
   * @param {String} name TownName or MazeName
   * @return {Npc[]}
   */
  static getNpcs(name) {
    const npcs = [];

    let add = 0;

    global.VBatchs[name].Batchs[0].VMonsterSpawnBox.forEach((entity) => {
      if (entity.m_eType1.value === "NPC") {
        const vid = entity.m_iMonsterID1.value;

        const position = Npc.getPosition(entity);

        const rotation = entity.m_fRotation.value;

        position.rotation = rotation;

        const waypoint = entity.m_iWaypoint.value;

        npcs.push(new Npc(add++, vid, position, waypoint));
      }
    });
    console.log(npcs);
    return npcs;
  }

  /**
   *
   * @param {NpcTable} table
   */
  static getrandomID(table) {
    let add = table.ID;
    for (let i = 0; i < 46; i++) {
      if (table[`unk${i}`] < 50) add += table[`unk${i}`] + Math.floor(Math.random() * 100);
    }
    return add;
  }

  static getPosition(entity) {
    const pos = entity.m_vPosBottomRight.value.split(",");
    const pos2 = entity.m_vPosTopLeft.value.split(",");
    const spawnPosType = entity.m_eCreationPositionType.value;

    const x = pos[0] - (pos[0] - pos2[0]) / 2;
    const y = pos[1] - (pos[1] - pos2[1]) / 2;
    const z = pos[2] - (pos[2] - pos2[2]) / 2;

    return new Position(x, y, z, 0);
  }
}

module.exports = Npc;

const Position = require("../../Characters/Position");

class Npc {
  constructor(id, position, waypoint) {
    this.id = id;
    this.position = position;
    this.waypoint = waypoint;
  }

  /**
   *
   * @param {String} name TownName or MazeName
   */
  static getNpcs(name) {
    const npcs = [];

    global.VBatchs[name].Batchs[0].VMonsterSpawnBox.forEach((entity) => {
      if (entity.m_eType1.value === "NPC") {
        const id = entity.m_iMonsterID1.value;

        const position = Npc.getPosition(entity);
        //entity.m_vPosTopLeft.value ???

        const waypoint = entity.m_iWaypoint.value;

        npcs.push({ id, position, waypoint });
      }
    });
    console.log(npcs);
    return npcs;
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

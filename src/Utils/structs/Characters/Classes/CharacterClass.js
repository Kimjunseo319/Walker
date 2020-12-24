const Stats = require("../Stats");
const SkillPreset = require("../Skills/SkillPreset");
const Position = require("../Position");
const Appearance = require("../Appearance");
const PhotoTable = require("../../../tables/PhotoTable");
const Gesture = require("../Gesture");

const WeaponItem = require("../../Items/WeaponItem");

const { SmartBuffer } = require("smart-buffer");
const FashionInventory = require("../Inventorys/FashionInventory");

class CharacterClass {
  static classTable = {
    None: 0,
    Haru: 1,
    Erwin: 2,
    Lily: 3,
    Jin: 4,
    Stella: 5,
    Iris: 6,
    Chii: 7,
    Ephnel: 8,
    Leenabi: 9,
  };

  /**
   *
   * @param {Stats} stats
   * @param {SkillPreset} skillPreset
   * @param {Position} position
   * @param {Appearance} appearance
   * @param {PhotoTable} photo
   * @param {Gesture} gesture
   * @param {WeaponItem} weaponItem
   * @param {FashionInventory} fashionInv
   */
  constructor(stats, skillPreset, position, appearance, photo, gesture, weaponItem, fashionInv) {
    this.stats = stats;
    this.skillPreset = skillPreset;
    this.position = position;
    this.appearance = appearance;
    this.photo = photo;
    this.gesture = gesture;

    this.weaponItem = weaponItem;
    this.fashionInv = fashionInv;

    //Default Settings
    this.userName = "";
    this.index = 0;
    this.characterID = 0;
    this.accountKey = 0;

    this.level = 1;

    this.classType = CharacterClass.classTable.None;
    this.classAdvance = 0; //0 - Normal / 1 - First Advance / 2 - Desire Advance
    this.exp = 0;

    this.money = 0;
    this.aether = 0;
    this.bp = 0;

    this.energy = 200;
    this.extraEnergy = 0;

    this.mapID = 10003;
  }

  toBuffer() {
    return new SmartBuffer()
      .writeUInt32LE(this.characterID)
      .writeUInt16LE(this.userName.length * 2)
      .writeString(this.userName, "utf16le")
      .writeUInt8(this.classType)
      .writeUInt8(this.classAdvance)
      .writeUInt16LE(this.photo.id)
      .writeUInt16LE(0)
      .writeUInt16LE(0)
      .writeUInt16LE(0)
      .writeBuffer(this.appearance.toBuffer())
      .writeBigInt64LE(BigInt(0)) //empty
      .writeUInt8(this.level)
      .writeUInt8(0)
      .writeBigUInt64LE(BigInt(0)) //empty
      .writeUInt8(0) //empty
      .writeBuffer(this.weaponItem.toBuffer())
      .writeUInt8(0)
      .writeInt32LE(-1)
      .writeBuffer(this.fashionInv.toBuffer())
      .toBuffer();
  }

  toMetadataBuffer() {
    return new SmartBuffer()
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt16LE(0)
      .writeUInt32LE(0)

      .writeUInt32LE(this.stats.baseStats.health)
      .writeUInt32LE(this.stats.baseStats.health)
      .writeUInt32LE(200)
      .writeUInt32LE(200)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt32LE(100)
      .writeUInt32LE(100)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeFloatLE(100.0)
      .writeFloatLE(100.0)
      .writeUInt16LE(0)
      .writeUInt8(0)
      .writeUInt16LE(this.energy)
      .writeUInt16LE(this.extraEnergy)
      .writeBigInt64LE(BigInt(0))
      .writeUInt32LE(0)
      .writeUInt16LE(0)
      .writeUInt16LE(this.mapID)
      .writeUInt16LE(101)
      .writeUInt16LE(256)
      .writeUInt16LE(this.mapID)
      .writeUInt16LE(1)
      .writeFloatLE(this.position.x)
      .writeFloatLE(this.position.y)
      .writeFloatLE(this.position.z)
      .writeFloatLE(this.position.rotation)
      .writeFloatLE(0)
      .writeFloatLE(0)
      .toBuffer();
  }

  /**
   * Take character information from the buffer and set it
   * @param {SmartBuffer} buf
   */
  static fromBuffer(buf) {
    const characterID = buf.readUInt32LE();
    const userName = buf.readString(buf.readUInt16LE(), "utf16le");
    const classType = buf.readUInt8();
    const classAdvance = buf.readUInt8();
    const photo = PhotoTable.getPhoto(buf.readUInt16LE());
    buf.readOffset += 6;
    const appearance = Appearance.fromBuffer(buf);
    buf.readOffset += 8;
    const level = buf.readUInt8();
    buf.readOffset += 10;
    const weaponItem = WeaponItem.fromBuffer(buf);
    buf.readOffset += 5;
    const fashionInv = FashionInventory.fromBuffer(buf);

    return { characterID, userName, classType, classAdvance, photo, appearance, level, weaponItem, fashionInv };
  }
}

module.exports = CharacterClass;

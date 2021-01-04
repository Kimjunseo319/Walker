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

    this.zenny = 0;
    this.aether = 0;
    this.bp = 0;

    this.energy = 200;
    this.extraEnergy = 0;

    this.mapID = 10031;

    this.channel = {};
    this.block = false; //!NO LAG!
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

  toMetadataBufferRaw() {
    return Buffer.from(
      "000000000000000000000000000000000000000000007E0400007E040000C8000000C80000000000000000000000640000006400000000000000000000000000C8420000C842000000C8002C010000000000000000000000000000000000000000000001000000001327660000041327020000BA2146EBC51E468E38CA420000B4420040C9430040C9430000000000000000000000000000000000000000BF3EFFDF196D3F1C0000000000000000000000000000000000000000000000000900313532303638353537000000000000000000000000000000000000000000000001",
      "hex"
    );
  }

  toMetadataBuffer() {
    const buf = new SmartBuffer()
      .writeUInt32LE(0)
      .writeUInt32LE(0) //main title
      .writeUInt32LE(0) //sub title
      .writeUInt32LE(0) //guild id
      .writeUInt16LE(0) //guild name len
      .writeString("", "utf16le") //guild name
      .writeUInt32LE(132645878)
      .writeUInt32LE(this.stats.baseStats.health) //curr hp
      .writeUInt32LE(this.stats.baseStats.health) //max hp
      .writeUInt32LE(200) //curr sg
      .writeUInt32LE(200) //max sg
      .writeUInt32LE(0) //unk
      .writeUInt32LE(0) //unk
      .writeUInt32LE(100) //unk
      .writeUInt32LE(102) //max stamina
      .writeUInt32LE(0) //unk
      .writeUInt32LE(0) //unk
      .writeFloatLE(100) //max move speed
      .writeFloatLE(104.5) //max attack speed
      .writeUInt16LE(0) //unk
      .writeUInt8(0) //unk
      .writeUInt16LE(200) //energy
      .writeUInt16LE(400) //extra energy
      .writeUInt8(0) //unk
      .writeInt8(0) //unk
      .writeInt8(7) //unk
      .writeUInt32LE(960464669) //unk
      .writeUInt16LE(0) //unk
      .writeUInt32LE(0) //unk
      .writeUInt32LE(0) //unk
      .writeUInt8(0) //slot?
      .writeUInt32LE(0) //unk
      .writeInt8(1) //unk
      .writeUInt32LE(0) //unk
      .writeUInt16LE(this.mapID) //map
      .writeUInt16LE(102) //unk
      .writeUInt8(0) //unk
      .writeUInt8(1) //unk but map
      .writeUInt16LE(this.mapID) //map
      .writeUInt16LE(7) //unk but map
      .writeBuffer(this.position.toBuffer()) //pos
      .writeFloatLE(2922.5) //unk but pos
      .writeFloatLE(2922.5) //unk but pos
      .writeInt8(-3) //unk
      .writeInt8(-44) //unk
      .writeUInt16LE(this.exp) // exp
      .writeUInt16LE(this.zenny) //zenny
      .writeInt8(-126)
      .writeInt8(2)
      .writeUInt32LE(0)
      .writeUInt32LE(2)
      .writeUInt32LE(3758046911)
      .writeUInt32LE(473918745)
      .writeUInt32LE(55967)
      .writeUInt32LE(0)
      .writeUInt16LE(2176)
      .writeInt8(51)
      .writeBuffer(Buffer.alloc(13))
      .writeUInt16LE(8) //len
      .writeString("10954090", "utf8")
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt32LE(0)
      .writeUInt16LE(0)
      .writeInt8(0)
      .writeInt8(1); //result

    return buf.toBuffer();
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

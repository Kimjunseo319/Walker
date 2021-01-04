const { SmartBuffer } = require("smart-buffer");
const crypto = require("crypto");

const CharacterClass = require("../../Utils/structs/Characters/Classes/CharacterClass");
const CharacterList = require("../../Utils/structs/CharacterList");

const Appearance = require("../../Utils/structs/Characters/Appearance");
const WeaponItem = require("../../Utils/structs/Items/WeaponItem");

const Session = require("../Sessions/Session");

const AccountDB = require("../../Utils/models/Account");
const CharacterDB = require("../../Utils/models/Character");

const Haru = require("../../Utils/structs/Characters/Classes/Haru");
const FashionInventory = require("../../Utils/structs/Characters/Inventorys/FashionInventory");
const Leenabi = require("../../Utils/structs/Characters/Classes/Leenabi");
const PhotoTable = require("../../Utils/tables/PhotoTable");
const Stats = require("../../Utils/structs/Characters/Stats");
const SkillPreset = require("../../Utils/structs/Characters/Skills/SkillPreset");
const Position = require("../../Utils/structs/Characters/Position");
const Gesture = require("../../Utils/structs/Characters/Gesture");

class CharacterUtil {
  /**
   *
   * @param {SmartBuffer} buf buffer
   * @param {Session} session session
   */
  static createCharacter(buf, session) {
    const { userName, classType, appearance, fashionInv } = CharacterClass.fromBuffer(buf);

    buf.readOffset += 94;
    const index = buf.readUInt8();
    buf.readOffset += 9;
    const cloth = buf.readUInt32LE();

    const fashion = new FashionInventory().setDefaultClothes(classType, (cloth - 100 * classType - 1) / 10);

    const stat = new Stats()
      .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
      .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

    const photo = PhotoTable.getPhoto(1000 * classType + 1);

    const char = new CharacterClass(
      stat,
      new SkillPreset(),
      new Position(41541.2, 45513.97, 4011.51, 0.0),
      appearance,
      photo,
      new Gesture(),
      WeaponItem.getDefaultWeapon(classType),
      fashion
    );

    char.userName = userName;
    char.characterID = crypto.randomBytes(4).readUInt32LE();
    char.index = index;
    char.appearance = appearance;
    char.accountKey = session.getAccountKey();
    char.fashionInv = fashion;
    char.classType = classType;
    return char;
  }

  /**
   *
   * @param {CharacterClass} char
   * @param {Session} session
   * @param {Function} cb
   */
  static saveNewCharacter(char, cb) {
    if (char.accountKey === 0) throw new Error(`[CharacterUtil]AccountKey is empty!!!!!!`);
    const appearance = { fashion: char.appearance.getFashions(), color: char.appearance.getColors() };

    const charDB = new CharacterDB({
      ID: char.characterID,
      Index: char.index,
      UserName: char.userName,
      ClassType: char.classType,
      ClassAdvance: char.classAdvance,
      Photo: char.photo.id,
      Appearance: {
        Hair: appearance.fashion.hair,
        HairColor: appearance.color.hair,
        EyeColor: appearance.color.eye,
        SkinColor: appearance.color.skin,
      },
      Stat: {
        Level: char.level,
        Weapon: char.weaponItem.ID,
        WeaponUpgrade: char.weaponItem.upgrade,
      },
      Inventory: {
        Fashion: char.fashionInv.inventory,
      },
    });
    charDB.save().then(async () => {
      const account = await AccountDB.findOne({ AccountKey: char.accountKey });
      account.Characters.push({ Index: char.index, CharID: char.characterID });
      account.save().then(() => {
        cb();
      });
    });
  }

  /**
   *
   * @param {Session} session
   * @param {Number} charID
   */
  static removeCharacter(session, charID) {
    session.account;
  }

  /**
   *
   * @param {Number} charID
   * @param {Number} accountKey
   */
  static async getCharacterFromDB(charID, accountKey) {
    const charDB = await CharacterDB.findOne({ ID: charID });

    //const charClass = CharacterUtil.getCharacterClass(charDB.ClassType);

    const appearance = new Appearance()
      .setFashions(charDB.Appearance.Hair)
      .setColors(charDB.Appearance.HairColor, charDB.Appearance.EyeColor, charDB.Appearance.SkinColor);

    const weapon = new WeaponItem(charDB.Stat.Weapon, charDB.Stat.WeaponUpgrade);

    const fashionInv = new FashionInventory();
    fashionInv.createInventory(charDB.Inventory.Fashion);

    //const char = new charClass(accountKey, appearance, weapon, charDB.Photo);

    const stat = new Stats()
      .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
      .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

    const char = new CharacterClass(
      stat,
      new SkillPreset(),
      new Position(41541.2, 45513.97, 4011.51, 0.0),
      appearance,
      charDB.Photo,
      new Gesture(),
      weapon,
      fashionInv
    );

    char.accountKey = accountKey;
    char.characterID = charDB.ID;
    char.index = charDB.Index;
    char.userName = charDB.UserName;
    char.classAdvance = charDB.ClassAdvance;
    char.classType = charDB.ClassType;
    char.level = charDB.Stat.Level;
    //char.fashionInv = fashionInv;
    return char;
  }

  static getCharacterList(accountKey, cb) {
    AccountDB.findOne({ AccountKey: accountKey }, async (err, account) => {
      if (err) throw new Error(err);
      const chars = account.Characters;

      const charList = [];

      for (let i = 0; i < chars.length; i++) {
        const charDB = chars[i];
        const char = await CharacterUtil.getCharacterFromDB(charDB.CharID, accountKey);
        charList.push(char);
      }
      cb(CharacterUtil.getCharacterListFromArray(charList));
    });
  }

  /**
   *
   * @param {CharacterClass[]} chars
   */
  static getCharacterListFromArray(chars) {
    return new CharacterList(chars);
  }

  /**
   * get Character Class
   * @param {Number} classType
   */
  static getCharacterClass(classType) {
    switch (classType) {
      case CharacterClass.classTable.Haru:
        return Haru;
      case CharacterClass.classTable.Leenabi:
        return Leenabi;
      default:
        return CharacterClass;
    }
  }
}

module.exports = CharacterUtil;

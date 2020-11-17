const { SmartBuffer } = require("smart-buffer");
const crypto = require("crypto");

const Struct = require("struct");

const CharacterSchema = require("../../../Utils/models/Character");
const AccountSchema = require("../../../Utils/models/Account");

const classTable = {
  Haru: 1,
  Erwin: 2,
  Lily: 3,
  Jin: 4,
  Stella: 5,
  Iris: 6,
  Chii: 7,
  Ephnel: 8,
};

/**
 *
 * @param {Buffer} buf
 */
function readCharacterData(buffer) {
  const buf = SmartBuffer.fromBuffer(buffer);
  const usernameLength = buf.readUInt8(4);
  buf.readOffset = 6;
  const username = buf.readString(usernameLength, "utf16le");
  let curroffset = usernameLength + 6;
  const playerClass = buf.readUInt16LE(curroffset);
  const UUID2 = buf.readUInt32LE(curroffset + 2);
  const hair = buf.readUInt16LE(curroffset + 10);
  const hairColor = buf.readUInt16LE(curroffset + 12);
  const eyeColor = buf.readUInt16LE(curroffset + 14);
  const skinColor = buf.readUInt16LE(curroffset + 16);
  curroffset = curroffset + 559; //239
  const characterSpace = buf.readInt8(curroffset + 30); //캐릭터가 어느 칸에 생성되었는지 알려줌
  const charData = {
    userName: username,
    classType: playerClass,
    hair: hair,
    hairColor: hairColor,
    eyeColor: eyeColor,
    skinColor: skinColor,
    index: characterSpace,
  };
  return charData;
}

function readCharacterDataV2(buf) {
  const reader = SmartBuffer.fromBuffer(buf);

  const id = reader.readUInt32LE();
  const usernameLen = reader.readUInt16LE();
  const username = reader.readString(usernameLen);
  const classType = reader.readUInt8();
}

function buildCharacterList(chars, accountKey, sessionKey) {
  const buf = new SmartBuffer().writeUInt8(chars.length); //캐릭터 수
  let select = null;
  for (let i = 0, l = chars.length; i < l; i++) {
    const index = chars[i].index;
    const char = getCharacterData(chars[i].char);
    buf.writeBuffer(char);
    buf.writeUInt16LE(index);
    buf.writeBigUInt64LE(BigInt(0));
    if (select === null) {
      select = chars[i].char.ID;
    }
  }
  buf
    .writeUInt32LE(select)
    .writeUInt16LE(1)
    .writeBigUInt64LE(BigInt(0))
    .writeUInt32LE(accountKey)
    .writeBigInt64LE(BigInt(sessionKey))
    .writeUInt16LE(17);

  return buf.toBuffer();
}

function saveNewCharacterData({ userName, classType, hair, hairColor, eyeColor, skinColor, index }, accountKey, cb) {
  const ID = crypto.randomBytes(4).readUInt32LE();

  const char = new CharacterSchema({
    ID: ID,
    UserName: userName,
    ClassType: classType,
    BeyondStatus: 0,
    Illust: 1000 * classType + 1,
    Unknown1: 0,
    Unknown2: 0,
    Unknown3: 0,
    Appearance: {
      Hair: hair,
      HairColor: hairColor,
      EyeColor: eyeColor,
      SkinColor: skinColor,
    },
    Stat: {
      Level: 1,
      Weapon: 110011301 + 1000000 * classType,
      WeaponUpgrade: 0,
    },
    Fashion: [
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: 201010701 + 10000000 * classType, //TODO: 캐릭터 옷이 이 옷으로 고정됨. 에프넬은 이게 아님;
        //ID: hair,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: 201011101 + 10000000 * classType, //TODO: 캐릭터 옷이 이 옷으로 고정됨. 에프넬은 이게 아님;
        //ID: hairColor,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: 201011201 + 10000000 * classType, //TODO: 캐릭터 옷이 이 옷으로 고정됨. 에프넬은 이게 아님;
        //ID: eyeColor,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: 201010801 + 10000000 * classType, //TODO: 캐릭터 옷이 이 옷으로 고정됨. 에프넬은 이게 아님;
        //ID: skinColor,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
      {
        UniqueID: -1,
        Unknown: -1,
        ID: -1,
        Dye: 0,
      },
    ],
  });
  char.save().then(() => {
    AccountSchema.findOne({ AccountKey: accountKey }, (err, acc) => {
      acc.Characters.push({ Index: index, CharID: ID });
      acc.save().then(() => {
        cb();
      });
    });
  });
}

/**
 *
 * @param {char} char
 */
function getCharacterData(char, meta = false) {
  const buf = new SmartBuffer()
    .writeUInt32LE(char.ID)
    .writeUInt16LE(char.UserName.length * 2)
    .writeString(char.UserName, "utf16le")
    .writeUInt8(char.ClassType)
    .writeUInt8(char.BeyondStatus) //승급, 데자이어워커 추정
    .writeUInt16LE(char.Illust) //캐릭터 일러스트
    .writeUInt16LE(0)
    .writeUInt16LE(0)
    .writeUInt16LE(0)
    .writeUInt16LE(char.Appearance.Hair) //적용중인 머리카락
    .writeUInt16LE(char.Appearance.HairColor) //적용중인 머리 색
    .writeUInt16LE(char.Appearance.EyeColor) //적용중인 눈 색
    .writeUInt16LE(char.Appearance.SkinColor); //적용중인 피부색
  writeEmpty(buf, 8) //KR서버에 8자리 빈칸이있음 ㄷㄷ
    .writeUInt8(char.Stat.Level) //레벨
    .writeUInt8(0); //UNKNOWN
  writeEmpty(buf, 9) //10자리 빈칸인데 칸수가 이상함
    .writeUInt8(char.Stat.WeaponUpgrade) //무기 강화진행도
    .writeInt32LE(char.Stat.Weapon) //무기 아이템ID
    .writeUInt8(0)
    .writeInt32LE(-1);
  for (let i = 0; i < 14; i++) {
    const item = char.Fashion[i];
    buf.writeInt32LE(item.UniqueID); //아이템 UNIQUEID?
    buf.writeInt32LE(item.Unknown);
    buf.writeInt32LE(item.ID);
    buf.writeUInt32LE(item.Dye); //아이템 염색

    buf.writeInt32LE(-1);
    buf.writeInt32LE(-1);
    buf.writeInt32LE(-1);
    buf.writeUInt32LE(0);
  }
  if (!meta) {
    writeEmpty(buf, 64).writeUInt16LE(16256).writeUInt16LE(0).writeUInt16LE(16256);
    writeEmpty(buf, 24);
  } else {
    buf.writeBuffer(
      Buffer.from(
        "000000000000000000000000000000000000000000007E0400007E040000C8000000C80000000000000000000000640000006400000000000000000000000000C8420000C842000000C80000000000071D873F3900000000000000000000000000000001000000007752EAC50100775204008DB5B047AB07A44747F9CC46000070410040C9430040C94300000000000000003A4D7B020000000000000000BF3EFFDF196D3F1C9FDA0000000000002EEB32000000000000000000000000000800",
        "hex"
      )
    );
  }
  return buf.toBuffer();
}

/**
 *
 * @param {SmartBuffer} buf
 * @param {Number} length
 */
function writeEmpty(buf, length) {
  for (let i = 0, l = length; i < l; i++) {
    buf.writeUInt8(0);
  }
  return buf;
}

module.exports = {
  classTable: classTable,
  getCharacterData: getCharacterData,
  buildCharacterList: buildCharacterList,
  saveNewCharacterData: saveNewCharacterData,
  readCharacterData: readCharacterData,
  writeEmpty: writeEmpty,
};

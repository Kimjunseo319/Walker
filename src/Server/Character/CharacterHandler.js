const { SmartBuffer } = require("smart-buffer");

const Handler = require("../../Utils/Handler");
const { opCode } = require("../../utils/opcode");

const AccountModel = require("../../Utils/models/Account");
const CharacterModel = require("../../Utils/models/Character");

const packetHandler = require("../../Utils/packetHandler");
const opcode = require("../../utils/opcode");
const Account = require("../../Utils/models/Account");
const CharacterList = require("../../Utils/structs/CharacterList");
const Haru = require("../../Utils/structs/Characters/Classes/Haru");
const Appearance = require("../../Utils/structs/Characters/Appearance");
const CharacterUtil = require("./CharacterUtil");

class CharacterHandler extends Handler {
  constructor(session) {
    super(session);
  }

  handleClientConnect() {
    //TODO: 세션키 검증
    const buf = SmartBuffer.fromBuffer(this._data);
    const AccountID = buf.readUInt32LE();
    const Unknown1 = buf.readUInt16LE();
    const SessionKey = buf.readBigUInt64LE();
    const Unknown2 = buf.readUInt8();

    //TODO: 만약 세션키 검증을 통과하면 캐릭터 리스트를 Character Session에 집어넣기

    //this._session.initSession({ accountKey: AccountID, sessionKey: SessionKey }, () => {
    this._session.initSession(AccountID, SessionKey, () => {
      const res = new SmartBuffer().writeUInt8(0).writeUInt32LE(AccountID).writeUInt32LE(this._session.charBG).writeUInt8(0).writeUInt8(0); //16 32 0?
      this.write(opCode.server.ServerResEnterCharacterServer, res.toBuffer());
    });
  }

  handleClientCharacterList() {
    const chars = this._session.characters;
    this.write(opCode.character.ServerResCharacterList, chars.length <= 0 ? Buffer.alloc(15) : chars.toBuffer(this._session));
  }

  handleClientCreateCharacter() {
    const char = CharacterUtil.createCharacter(SmartBuffer.fromBuffer(this._data), this._session);
    CharacterUtil.saveNewCharacter(char, () => {
      this._session.updateSession(() => {
        this.handleClientCharacterList();
      });
    });
  }

  handleClientRemoveCharacter() {
    const charID = this._data.readUInt32LE();
    const accountKey = this._session.getAccountKey();
    if (charID != 1) {
      //!FOR DEBUG!
      CharacterModel.findOne({ ID: charID }, (err, char) => {
        AccountModel.findOne({ AccountKey: accountKey }, (err, account) => {
          const _this = this;
          Object.keys(account.Characters).filter(function (key) {
            if (account.Characters[key].CharID === charID) {
              account.Characters[key].remove();
              account.save(null, () => {
                char.remove(null, () => {
                  _this._session.updateSession(() => {
                    _this.handleClientCharacterList();
                  });
                  console.log(`[Character]${charID}의 캐릭터 삭제가 완료되었습니다!`);
                });
              });
            }
          });
        });
      });
    } else {
      this._session.updateSession(() => {
        this.handleClientCharacterList();
      });
    }
  }

  handleClientChangeCharacterSlot() {
    const buf = SmartBuffer.fromBuffer(this._data);
    buf.readOffset = 15;
    const char1 = buf.readUInt8();
    const char2 = buf.readUInt8();

    AccountModel.findOne({ AccountKey: this._session.getAccountKey() }, (err, account) => {
      if (err) throw new Error(err);
      const _this = this;
      let char_dummy = [];
      Object.keys(account.Characters).filter(function (key) {
        const char = account.Characters[key];
        if (char.Index == char1) char_dummy[0] = { index: char.Index, key: key };
        if (char.Index == char2) char_dummy[1] = { index: char.Index, key: key };
      });
      account.Characters[char_dummy[0].key] = char_dummy[1].index;
      account.Characters[char_dummy[1].key] = char_dummy[0].index;
      account.save(null, () => {
        console.log("캐릭터 위치 변경이 완료되었습니다!");
      });
    });

    console.log(`${char1}번 캐릭터를 ${char2}로 옮겼습니다`);
  }

  handleClientChangeBackground() {
    const buf = SmartBuffer.fromBuffer(this._data);
    const accountID = buf.readUInt32LE();
    const bg = buf.readUInt16LE();

    Account.findOne({ AccountKey: accountID }, (err, account) => {
      if (err) console.error(err);
      account.CharacterBackground = bg;

      account.save(null, () => {
        const res = new SmartBuffer().writeUInt32LE(accountID).writeUInt16LE(bg);

        this.write(opCode.misc.EveryBothSetCharSelectBG, res.toBuffer());
      });
    });
  }

  handleClientConnectGameServer() {
    const buf = SmartBuffer.fromBuffer(this._data);
    const CharID = buf.readUInt32LE();
    const Unknown1 = buf.readUInt32LE();
    const CharIndex = buf.readUInt8();
    const Unknown2 = buf.readBigUInt64LE();

    console.log(this._session.characters);

    const res = new SmartBuffer()
      .writeUInt32LE(CharID)
      .writeUInt32LE(this._session.getAccountKey())
      .writeUInt32LE(131330)
      .writeUInt32LE(0) //똑같음
      .writeUInt32LE(0) //똑같음
      .writeUInt16LE(102)
      .writeUInt8(0)
      .writeUInt8(4)
      //.writeUInt16LE(10003) //캐릭터 맵 위치
      .writeUInt16LE(this._session.characters.chars[this._session.selected].mapID)
      .writeUInt16LE(2)
      .writeBigUInt64LE(BigInt(0)) //8칸 빈공간
      .writeUInt16LE("127.0.0.1".length)
      .writeString("127.0.0.1", "utf8")
      .writeUInt16LE(10200)
      .writeUInt16LE(this._session.characters.chars[this._session.selected].mapID) //캐릭터 맵 위치
      //.writeUInt16LE(10003)
      .writeBigUInt64LE(BigInt(0))
      .writeFloatLE(41541.2) //X
      .writeFloatLE(45513.97) //Y
      .writeFloatLE(4011.51) //Z
      .writeFloatLE(0.0) //ROC
      .writeFloatLE(0.0)
      .writeFloatLE(0.0);
    //.writeInt16LE(-1)
    //.writeBuffer(Buffer.from("000000000000000000000000000000000000000000000000000006000000000000000000", "hex"));

    //.writeInt16LE(-1); //FF FF

    this.write(opCode.server.ServerResEnterGameServerConnection, res.toBuffer());

    //.writeBigUInt64LE(BigInt(0)) //모르겠음 (본섭: 06 01 02 00[131334] 31 32 20 00[2110001]) 32 32 일수도 있음
    //.writeUInt32LE(0); //모르겠음 (본섭: 31 32 20 00, [2110001])
  }

  handleCharacterSelect() {
    const buf = SmartBuffer.fromBuffer(this._data);
    const index = buf.readUInt8();
    this._session.selected = index;
    console.log(`${this._session._accountKey} 유저의 캐릭터 선택값을 ${this._session.selected}로 변경했습니다!`);
  }

  sendTimestamp(client) {
    const date = new Date();
    const unixTime = BigInt(Math.floor(+date / 1000));
    const time = new SmartBuffer()
      .writeBigInt64LE(unixTime)
      .writeUInt16LE(date.getFullYear())
      .writeUInt16LE(date.getMonth() + 1)
      .writeUInt16LE(date.getDate())
      .writeUInt16LE(date.getHours())
      .writeUInt16LE(date.getMinutes())
      .writeUInt16LE(date.getSeconds())
      .writeUInt16LE(0);

    this.write(opCode.misc.ServerResCurrentDate, time.toBuffer());
  }

  execute(opcode, data) {
    this._opcode = opcode;
    this._data = data;

    switch (this._opcode) {
      case opCode.server.ClientReqEnterCharacterServer:
        this.handleClientConnect();
        this.sendTimestamp();
        break;
      case opCode.character.ClientReqCharacterList:
        this.handleClientCharacterList();
        break;
      case opCode.character.ClientReqCreateCharacter:
        this.handleClientCreateCharacter();
        break;
      case opCode.character.ClientReqRemoveCharacter:
        this.handleClientRemoveCharacter();
        break;
      case opCode.server.ClientReqGameServerConnection:
        this.handleClientConnectGameServer();
        break;
      case opCode.character.ClientReqCharacterSelect:
        this.handleCharacterSelect();
        break;
      case opCode.misc.EveryBothSetCharSelectBG:
        this.handleClientChangeBackground();
        break;
      case opCode.character.ClientReqCharacterSlotChange:
        this.handleClientChangeCharacterSlot();
        break;
      default:
        console.error("모르는거!", this._opcode, this._data.toString("hex"));
        break;
    }
  }
}

module.exports = CharacterHandler;

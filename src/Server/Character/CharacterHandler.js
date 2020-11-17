const { SmartBuffer } = require("smart-buffer");

const Handler = require("../../Utils/Handler");
const { opCode } = require("../../utils/opcode");

const AccountModel = require("../../Utils/models/Account");
const CharacterModel = require("../../Utils/models/Character");

const packetHandler = require("../../Utils/packetHandler");
const opcode = require("../../utils/opcode");
const character = require("./Util/character");

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

    const res = new SmartBuffer().writeUInt8(0).writeUInt32LE(AccountID);
    //TODO: 만약 세션키 검증을 통과하면 캐릭터 리스트를 Character Session에 집어넣기

    this._session.initSession({ accountKey: AccountID, sessionKey: SessionKey }, () => {
      const encrypt = packetHandler.encrypt({ opcode: opCode.server.ServerResEnterCharacterServer, data: res.toBuffer() });
      this._session.getClient().write(encrypt);
    });
  }

  handleClientCharacterList() {
    const chars = this._session.characters;
    let res = undefined;
    if (chars.length <= 0) {
      res = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], "hex");
    } else {
      res = character.buildCharacterList(chars, this._session.getAccountKey(), this._session.getSessionKey());
    }
    const encrypt = packetHandler.encrypt({ opcode: opCode.character.ServerResCharacterList, data: res });
    this._session.getClient().write(encrypt);
  }

  handleClientCreateCharacter() {
    const char = character.readCharacterData(this._data);
    character.saveNewCharacterData(char, this._session.getAccountKey(), () => {
      this._session.updateSession(() => {
        this.handleClientCharacterList();
      });
    });
  }

  handleClientRemoveCharacter() {
    const charID = this._data.readUInt32LE();
    const accountKey = this._session.getAccountKey();
    CharacterModel.findOne({ ID: charID }, (err, char) => {
      AccountModel.findOne({ AccountKey: accountKey }, (err, account) => {
        const _this = this;
        Object.keys(account.Characters).filter(function (key) {
          if (account.Characters[key].CharID === charID) {
            account.Characters[key].remove();
            account.save(null, () => {
              char.remove(null, () => {
                _this._session.updateSession(() => {
                  const buf = new SmartBuffer().writeUInt8(1).writeUInt32LE(charID).toBuffer();
                  _this._session.getClient().write(packetHandler.encrypt({ opcode: "", data: buf }));
                });
                console.log(`[Character]${charID}의 캐릭터 삭제가 완료되었습니다!`);
              });
            });
          }
        });
      });
    });
  }

  handleClientConnectGameServer() {
    const buf = SmartBuffer.fromBuffer(this._data);
    const CharID = buf.readUInt32LE();
    const Unknown1 = buf.readUInt32LE();
    const CharIndex = buf.readUInt8();
    const Unknown2 = buf.readBigUInt64LE();

    const res = new SmartBuffer()
      .writeUInt32LE(CharID)
      .writeUInt32LE(this._session.getAccountKey())
      .writeUInt32LE(131334) //이거 모르겠음 ㅎ
      .writeUInt32LE(2110001) //똑같음
      .writeUInt32LE(2110001) //똑같음
      .writeUInt32LE(93110) //모르겠음 (본섭: B6 6B 01 00[93110])
      .writeUInt32LE(414327) //모르겠음 (본섭: 77 52 06 00[414327])
      .writeBigUInt64LE(BigInt(0)) //8칸 빈공간
      .writeUInt16LE("127.0.0.1".length)
      .writeString("127.0.0.1", "utf8")
      .writeUInt16LE(10200)
      .writeInt16LE(-1); //FF FF
    character.writeEmpty(res, 36); //36칸 빈공간

    const encrypt = packetHandler.encrypt({
      opcode: opCode.server.ServerResGameServerConnection,
      data: res.toBuffer(),
    });
    this._session.getClient().write(encrypt);

    //.writeBigUInt64LE(BigInt(0)) //모르겠음 (본섭: 06 01 02 00[131334] 31 32 20 00[2110001]) 32 32 일수도 있음
    //.writeUInt32LE(0); //모르겠음 (본섭: 31 32 20 00, [2110001])
  }

  handleCharacterSelect() {
    const buf = SmartBuffer.fromBuffer(this._data);
    buf.readUInt8();
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

    const encrypt = packetHandler.encrypt({ opcode: opCode.misc.ServerResCurrentDate, data: time.toBuffer() });
    this._session.getClient().write(encrypt);
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
      default:
        console.error("모르는거!", this._opcode, this._data.toString("hex"));
        break;
    }
  }
}

module.exports = CharacterHandler;

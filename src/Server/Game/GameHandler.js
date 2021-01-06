const { SmartBuffer } = require("smart-buffer");
const Handler = require("../../Utils/Handler");
const GameSession = require("../Sessions/GameSession");

const { opCode } = require("../../Utils/opcode");
const option = require("../../../option.json");

const packetHandler = require("../../Utils/packetHandler");

const ChatHandler = require("./Handlers/ChatHandler");
const FriendHandler = require("./Handlers/FriendHandler");
const HeartBeatHandler = require("./Handlers/HeartbeatHandler");
const MapHandler = require("./Handlers/MapHandler");
const GestureHandler = require("./Handlers/GestureHandler");
const MoveHandler = require("./Handlers/MoveHandler");
const PostJoinEvent = require("./Events/PostJoinEvent");
const ChannelHandler = require("./Handlers/ChannelHandler");
const Npc = require("../../Utils/structs/VXml/structs/Npc");
const CharacterClass = require("../../Utils/structs/Characters/Classes/CharacterClass");

class GameHandler extends Handler {
  /**
   *
   * @param {GameSession} session
   */
  constructor(session) {
    super(session);
  }

  async handleClientEnterGameServer() {
    const buf = SmartBuffer.fromBuffer(this._data);
    const accountID = buf.readUInt32LE();
    const charID = buf.readUInt32LE();

    await this._session.initSession(charID, accountID);
    this.sendTimestamp(() => {
      this.sendServerVersion(() => {
        this.sendEventBooster(() => {
          this.sendSuperArmorGage(() => {
            this.sendBoosterAdd(() => {
              this.sendWorldEnterNew(() => {
                this.sendBattleArena(() => {
                  this.sendAttendanceLoad(() => {
                    this.write("0x0866", Buffer.alloc(4), () => {
                      this.write("0x0868", Buffer.alloc(5), () => {
                        this.sendCharacterStatUpdate(() => {
                          this.sendUnknown1(() => {
                            this.sendExchangeAndEvent(() => {
                              this.write("0x1835", Buffer.alloc(4), () => {});
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  handleCharacterInfo(force = false) {
    if (!this._session.character.block || force) {
      this._session.character.block = true;
      const buf = this._session.character.toBuffer();
      const buf2 = this._session.character.toMetadataBuffer();
      const charbuf = Buffer.concat([buf, buf2]);
      this.write("0x0330", Buffer.alloc(0), () => {
        this.write(opCode.character.ServerResCharacterInfo, charbuf, () => {
          this.sendUnknown2(() => {
            this.sendInfiniteTowerLoadInfo(() => {
              this.sendUnknown3(() => {
                this.sendLoadDistrictMaze(() => {
                  this.execute("0xF101", Buffer.alloc(0));
                });
              });
            });
          });
        });
      });
    }
  }

  sendLoadDistrictMaze(cb) {
    this.write("0x0361", Buffer.alloc(1), () => {
      this.write("0x0362", Buffer.alloc(2), () => {
        this.write("0x1164", new SmartBuffer().writeUInt8(0).writeUInt32LE(this._session.character.characterID).writeUInt8(1).toBuffer(), () => {
          this.write("0x0443", new SmartBuffer().writeUInt32LE(this._session.character.characterID).writeUInt16LE(0).toBuffer(), () => {
            this.write(
              "0x0446",
              new SmartBuffer()
                .writeUInt32LE(this._session._accountKey)
                .writeUInt32LE(this._session.character.characterID)
                .writeUInt16LE(0)
                .writeUInt8(0)
                .toBuffer(),
              () => {
                this.write("0x2101", Buffer.alloc(2), () => {
                  this.write("0x0370", Buffer.alloc(256), () => {
                    this.write(
                      "0x2302",
                      new SmartBuffer()
                        .writeUInt32LE(1000)
                        .writeUInt32LE(1001)
                        .writeUInt32LE(1002)
                        .writeUInt32LE(1003)
                        .writeUInt32LE(1005)
                        .writeUInt32LE(1004)
                        .toBuffer(),
                      () => {
                        this.write("0x084A", Buffer.alloc(5), cb);
                      }
                    );
                  });
                });
              }
            );
          });
        });
      });
    });
  }

  sendNpcs(cb = () => {}) {
    const char = this._session.character;

    const map = option.District[char.mapID];

    const npcs = Npc.getNpcs(map ? map.VBatch : "F031_ROCCOTOWN");
    const buf = new SmartBuffer().writeUInt16LE(npcs.length);

    npcs.forEach((npc) => {
      buf.writeBuffer(npc.toBuffer());
    });
    this.write("0x0422", buf.toBuffer(), cb);
  }

  sendNPCsRaw(cb) {
    this.writeBuffer(
      "0x0422",
      "1B 00 E9 03 00 20 4D 40 3C 46 85 B0 00 46 00 00 C8 42 00 00 34 C3 7E 04 00 00 00 00 00 00 00 00 00 00 01 63 8B 01 00 EC 03 00 20 1C 52 31 46 85 3E ED 45 03 00 C8 42 00 00 34 C3 7E 04 00 00 00 00 00 00 00 00 00 00 01 DD 8A 01 00 F5 03 00 20 9C 62 51 46 96 A3 01 46 00 00 C8 42 00 00 34 C3 7E 04 00 00 00 00 00 00 00 00 00 00 01 E2 8A 01 00 F6 03 00 20 29 2F 20 46 C5 CC 11 46 FE FF C7 42 00 00 B4 42 7E 04 00 00 00 00 00 00 00 00 00 00 01 F3 8A 01 00 FE 03 00 20 60 43 20 46 D7 1B 07 46 00 00 C8 42 00 00 B4 42 7E 04 00 00 00 00 00 00 00 00 00 00 01 E8 8A 01 00 03 04 00 20 3D 8A 20 46 D3 A6 F9 45 00 00 C8 42 00 00 B4 42 7E 04 00 00 00 00 00 00 00 00 00 00 01 A5 8B 01 00 EA 03 00 20 77 7B 5B 46 85 E5 20 46 B2 3D D4 43 00 00 28 C2 7E 04 00 00 00 00 00 00 00 00 00 00 01 85 8C 01 00 F0 03 00 20 00 74 86 46 00 C0 05 46 00 00 C8 42 00 00 0C 43 7E 04 00 00 00 00 00 00 00 00 00 00 01 8B 8A 01 00 F1 03 00 20 A5 36 8D 46 9B CC 11 46 00 00 C8 42 00 00 B4 C2 7E 04 00 00 00 00 00 00 00 00 00 00 01 8C 8A 01 00 F3 03 00 20 00 4C 81 46 00 1C 09 46 16 02 C8 42 00 00 34 43 7E 04 00 00 00 00 00 00 00 00 00 00 01 8D 8A 01 00 FC 03 00 20 EA 96 72 46 71 3E DF 45 FD FF C7 42 00 00 06 C3 7E 04 00 00 00 00 00 00 00 00 00 00 01 91 8A 01 00 EB 03 00 20 18 B2 50 46 CF A8 2F 46 92 8B C7 42 00 00 00 00 7E 04 00 00 00 00 00 00 00 00 00 00 01 AA 8A 01 00 EF 03 00 20 B6 51 39 46 AD 22 45 46 00 90 C9 42 00 00 00 00 7E 04 00 00 00 00 00 00 00 00 00 00 01 67 8B 01 00 F2 03 00 20 00 B0 24 46 00 88 3D 46 00 90 C9 42 00 00 40 42 7E 04 00 00 00 00 00 00 00 00 00 00 01 9D 8A 01 00 F7 03 00 20 FF 3B 42 46 5D 24 36 46 00 90 C9 42 00 00 B4 C2 7E 04 00 00 00 00 00 00 00 00 00 00 01 9F 8A 01 00 F9 03 00 20 9A F7 30 46 B5 2A 2A 46 96 78 C9 42 00 00 B4 42 7E 04 00 00 11 04 00 00 00 00 00 00 01 43 8B 01 00 FA 03 00 20 F1 98 2F 46 21 28 45 46 00 90 C9 42 00 00 00 00 7E 04 00 00 00 00 00 00 00 00 00 00 01 66 8B 01 00 FF 03 00 20 D6 69 3C 46 67 16 42 46 00 90 C9",
      cb
    );
  }

  sendUnknown3(cb) {
    this.writeBuffer("0x0109", "02 00 00 00 00 00 00 00", () => {
      this.writeBuffer("0x0107", "01 01 01 01 01 01 00 00 01 01 00 01 01 00 01", cb);
    });
  }

  sendInfiniteTowerLoadInfo(cb) {
    this.write("0x2801", Buffer.alloc(14), cb);
  }

  sendUnknown2(cb) {
    this.writeBuffer(
      "0x0670",
      "00 00 00 00 00 00 00 00 00 00 00 00 03 00 0C 00 4B B7 B7 00 00 00 00 00 7B 2C B8 00 00 00 00 00 D3 1B B7 00 00 00 00 00 AB A1 B8 00 00 00 00 00 6F 00 00 00 00 00 00 00 2F 4A AA 00 00 00 00 00 0B 00 00 00 00 00 00 00 9B 7A B8 00 00 00 00 00 8B 53 B8 00 00 00 00 00 BB C8 B8 00 00 00 00 00 9B 1C B7 00 00 00 00 00 BB 1F B7 00 00 00 00 00 0C 00 4B B7 B7 00 00 00 00 00 7B 2C B8 00 00 00 00 00 D3 1B B7 00 00 00 00 00 AB A1 B8 00 00 00 00 00 6F 00 00 00 00 00 00 00 2F 4A AA 00 00 00 00 00 0B 00 00 00 00 00 00 00 9B 7A B8 00 00 00 00 00 8B 53 B8 00 00 00 00 00 BB C8 B8 00 00 00 00 00 9B 1C B7 00 00 00 00 00 BB 1F B7 00 00 00 00 00 0C 00 00 D3 1B B7 00 9B 1C B7 00 BB 1F B7 00 00 00 00 00 01 00 9B 1C B7 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 BB 1F B7 00 00 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 1E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 1F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 20 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 21 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 22 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 23 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 00 00 01 00 0B 00 15 00 00 00 05 00 00 01 00 0B 00 15 00 00 00",
      cb
    );
  }

  sendExchangeAndEvent(cb) {
    this.write("0x2B03", new SmartBuffer().writeUInt32LE(this._session.character.characterID).writeUInt16LE(0).toBuffer(), () => {
      this.writeBuffer("0x2A28", Buffer.alloc(12), cb);
    });
  }

  sendUnknown1(cb) {
    this.write(
      "0x0309",
      new SmartBuffer()
        .writeUInt32LE(this._session.character.characterID)
        .writeUInt16LE(1)
        .writeUInt32LE(1001)
        .writeUInt16LE(0)
        .writeUInt32LE(1)
        .writeUInt32LE(0)
        .writeUInt8(0)
        .toBuffer(),
      cb
    );
  }

  sendCharacterStatUpdate(cb) {
    this.write(
      "0x0334",
      new SmartBuffer()
        .writeUInt8(0)
        .writeUInt32LE(this._session.character.characterID)
        .writeBuffer(
          Buffer.from(
            "1B0000C8420300000040400400000040400500000040400600000040400700000040400800000040400D000000C8420E000000A0400F000000484211003333B34214000000E04215000000F04216000000164317000000F0401800000016421900000E49441A0000C08C421B00000048421C000000803F1D000000C03E1E009A99993E20003333B34223000000403F2400BC74933C26000000403F2B009A99193E2C00",
            "hex"
          )
        )
        .toBuffer(),
      () => {
        this.write(
          "0x0334",
          new SmartBuffer()
            .writeUInt8(0)
            .writeUInt32LE(this._session.character.characterID)
            .writeBuffer(Buffer.from("0600C08F44010000004843020000C08F440A00000048430C000000C84212000000C8421300", "hex"))
            .toBuffer(),
          cb
        );
      }
    );
  }

  sendAttendanceLoad(cb) {
    /*this.writeBuffer(
      "0x2A01",
      "F4 03 00 00 4C 9B CC 5F 00 00 00 00 E7 7B DA 5F 00 00 00 00 F4 32 DD 5F 00 00 00 00 8A D9 E5 5F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 04 01 02 00 00 00 01 8A D9 E5 5F 00 00 00 00 01 02 00 00 00 00 23 00 00 00 00 00 00 00 D5 D9 E5 5F 00 00 00 00 01 02 00 00 00",
      cb
    );*/
    cb();
  }

  sendBattleArena(cb) {
    /*this.writeBuffer(
      "0x3306",
      "6D 52 00 00 F4 B6 E5 5F 00 00 00 00 20 B8 E5 5F 00 00 00 00 04 C5 E5 5F 00 00 00 00 30 C6 E5 5F 00 00 00 00 24 E1 E5 5F 00 00 00 00 50 E2 E5 5F 00 00 00 00",
      cb
    );*/
    cb();
  }

  sendWorldEnterNew(cb) {
    const posBuf = this._session.character.position.toBuffer();
    const buf = new SmartBuffer()
      .writeUInt32LE(0)
      .writeUInt8(1)
      .writeUInt16LE(this._session.character.mapID)
      .writeUInt8(102)
      .writeUInt16LE(0)
      .writeUInt8(4)
      .writeUInt16LE(this._session.character.mapID)
      .writeUInt8(2)
      .writeUInt16LE(0)
      .writeBuffer(posBuf)
      .writeBigUInt64LE(BigInt(0))
      .toBuffer();
    this.write("0x0322", buf);
  }

  sendBoosterAdd(cb) {
    this.writeBuffer("0x2902", "01 32 07 6A 6B 22 00 00 00 00 00", cb);
  }

  sendSuperArmorGage(cb) {
    this.write(
      "0x1753",
      new SmartBuffer().writeUInt32LE(this._session.character.characterID).writeUInt32LE(1137262592).writeUInt32LE(1137262592).toBuffer(),
      cb
    );
  }

  sendEventBooster(cb) {
    this.writeBuffer("0x2A30", "E9 03 00 00 01 80 13 D0 5F 00 00 00 00 FF 37 FE 5F 00 00 00 00 3C 00 00 00 00 00 00", () => {
      this.writeBuffer(
        "0x2A20",
        "BF 00 F1 52 1F 14 FA 52 F7 13 FB 52 01 14 4B 53 F7 13 54 53 1F 14 5F 53 1F 14 A5 53 15 14 AE 53 F7 13 B7 53 F7 13 C2 53 01 14 C3 53 0B 14 09 54 15 14 12 54 29 14 13 54 29 14 1B 54 F7 13 1C 54 0B 14 27 54 29 14 61 56 29 14 6A 56 0B 14 6B 56 15 14 74 56 0B 14 7E 56 1F 14 C4 56 F7 13 CE 56 0B 14 CF 56 0B 14 D9 56 F7 13 E2 56 0B 14 E3 56 01 14 28 57 15 14 29 57 01 14 32 57 1F 14 46 57 1F 14 47 57 15 14 8C 57 15 14 95 57 01 14 97 57 01 14 A1 57 0B 14 F0 57 01 14 FA 57 01 14 FB 57 33 14 05 58 F7 13 0E 58 01 14 0F 58 01 14 49 5A 29 14 51 5A 1F 14 5B 5A 01 14 5C 5A 0B 14 5D 5A F7 13 66 5A 01 14 AC 5A 15 14 B6 5A 0B 14 B7 5A F7 13 C1 5A 0B 14 CB 5A 01 14 0F 5B F7 13 11 5B 0B 14 1A 5B F7 13 1B 5B 0B 14 25 5B F7 13 2D 5B F7 13 2E 5B 0B 14 73 5B F7 13 75 5B F7 13 7E 5B 01 14 7F 5B F7 13 87 5B 15 14 89 5B 01 14 92 5B 01 14 D9 5B 1F 14 E1 5B 15 14 E2 5B F7 13 E3 5B 0B 14 ED 5B 1F 14 F6 5B F7 13 47 5C F7 13 51 5C 0B 14 5A 5C 15 14 2F 5E 29 14 30 5E 01 14 31 5E 15 14 3B 5E F7 13 4F 5E 0B 14 94 5E 29 14 9F 5E 1F 14 A9 5E 15 14 B3 5E F7 13 F9 5E F7 13 02 5F 01 14 0B 5F 0B 14 15 5F 29 14 17 5F 29 14 67 5F 33 14 6F 5F 15 14 70 5F 1F 14 79 5F 15 14 7B 5F 1F 14 CA 5F 01 14 CB 5F 29 14 D5 5F 0B 14 24 60 0B 14 25 60 F7 13 2F 60 F7 13 39 60 1F 14 41 60 F7 13 42 60 01 14 89 60 0B 14 9B 60 1F 14 9C 60 F7 13 9D 60 0B 14 A5 60 F7 13 A6 60 15 14 19 62 15 14 22 62 01 14 2D 62 01 14 37 62 0B 14 86 62 29 14 8F 62 F7 13 90 62 F7 13 91 62 0B 14 99 62 01 14 9A 62 0B 14 9B 62 01 14 DF 62 1F 14 F4 62 F7 13 F5 62 0B 14 FF 62 0B 14 43 63 1F 14 44 63 F7 13 45 63 1F 14 4E 63 F7 13 4F 63 1F 14 58 63 F7 13 61 63 F7 13 0B 66 0B 14 13 66 01 14 15 66 F7 13 1E 66 F7 13 64 66 15 14 6D 66 0B 14 6E 66 0B 14 6F 66 1F 14 77 66 15 14 79 66 33 14 82 66 F7 13 83 66 15 14 C7 66 1F 14 D2 66 F7 13 D3 66 F7 13 DC 66 1F 14 E5 66 1F 14 E7 66 F7 13 2C 67 1F 14 2D 67 01 14 36 67 F7 13 4B 67 01 14 9A 67 F7 13 9B 67 1F 14 A4 67 29 14 A5 67 01 14 AE 67 29 14 F5 67 F7 13 FE 67 01 14 07 68 F7 13 08 68 01 14 09 68 F7 13 11 68 F7 13 12 68 01 14 59 68 01 14 6C 68 15 14 76 68 0B 14 77 68 01 14 E8 69 15 14 F2 69 0B 14 FB 69 0B 14 FD 69 0B 14 07 6A 0B 14 4C 6A F7 13 4D 6A 0B 14 56 6A F7 13 61 6A F7 13 6A 6A 15 14 6B 6A 0B 14 B1 6A 15 14 B9 6A 01 14 C5 6A 15 14 CE 6A F7 13 13 6B 15 14 1F 6B F7 13 28 6B F7 13 29 6B 0B 14 33 6B 01 14",
        cb
      );
    });
  }

  sendServerVersion(cb) {
    this._session.getClient().write(
      packetHandler.encrypt({
        opcode: "0x0404",
        //data: Buffer.from("00000000010000004303000073410000", "hex"),
        data: Buffer.from("000000000100000045030000F8410000", "hex"),
      }),
      cb
    );
  }

  sendTimestamp(cb) {
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
    this._session.getClient().write(encrypt, () => {
      cb();
    });
  }

  async execute(opcode, data) {
    this._opcode = opcode;
    this._data = data;

    switch (this._opcode) {
      case opCode.server.ClientReqWorldServerConnection:
        await this.handleClientEnterGameServer();
        break;
      case opCode.character.ClientReqCharacterInfo:
        this.handleCharacterInfo();
        break;
      case "0x0406": //ClientReqOthersInfo
        this.sendNpcs();
        break;
      case "0x0701": //ClientReqChatInfo
        new ChatHandler(this).handleChat();
        break;
      case "0x0106": //ClientReqHeartBeat
        new HeartBeatHandler(this).handle();
        break;
      case "0x2533":
        await new FriendHandler(this).findFriends();
        break;
      case "0x2511":
        await new FriendHandler(this).addFriend();
        break;
      case "0x0401":
        new MapHandler(this).teleportMap();
        break;
      case "0x2301":
        new GestureHandler(this).execute();
        break;
      case "0x3501":
        new GestureHandler(this).execute();
        break;
      case "0x0501":
        new MoveHandler(this).movementStart();
        break;
      case "0x0503":
        new MoveHandler(this).movementEnd();
        break;
      case "0x0505":
        new MoveHandler(this).movementJump();
        break;
      case "0xF101":
        new ChannelHandler(this).handleChannelInfo();
        break;
      case "0x24101":
        new PostJoinEvent(this).execute();
        break;
      case "0x24102":
        new ChannelHandler(this).handleChannelChange();
        break;
      default:
        console.error("모르는거!", this._opcode, this._data.toString("hex"));
        break;
    }
  }
}
module.exports = GameHandler;

const { SmartBuffer } = require("smart-buffer");
const Handler = require("../../Utils/Handler");
const { opCode } = require("../../Utils/opcode");
const packetHandler = require("../../Utils/packetHandler");
const character = require("../Character/Util/character");

class GameHandler extends Handler {
  constructor(session) {
    super(session);
  }

  handleClientEnterGameServer() {
    console.log("클라이언트 접근 감지!");
    const buf = SmartBuffer.fromBuffer(this._data);
    const AccountID = buf.readUInt32LE();
    const CharID = buf.readUInt32LE();
    const Unknown1 = buf.readUInt32LE();
    const Unknown2 = buf.readUInt32LE();
    const Unknown3 = buf.readUInt8();
    const Unknown4 = buf.readBigUInt64LE();

    this._session.initSession(CharID, () => {
      console.log("클라이언트 Session Init!");
      this.sendTimestamp(() => {
        console.log("클라이언트 SendTimestamp!");
        this.sendServerVersion(() => {
          console.log("클라이언트 SendServerVersion!");
          //this.sendServerUnknown1();
          this.sendServerSpritWorker();
        });
      });
    });
  }

  skillPoint() {
    return new SmartBuffer().writeUInt32LE(0).writeUInt16LE(0).writeUInt16LE(0).writeUInt16LE(3).writeUInt8(0);
  }

  handleCharacterGesture() {
    const buf = new SmartBuffer();
    for (let i = 0; i < 6; i++) {
      buf.writeUInt32LE(7000 + i);
    }
    const enc = packetHandler.encrypt({ opcode: "0x2303", data: buf.toBuffer() });
    this._session.getClient().write(enc);
  }

  handleSkillTest() {
    const buf = new SmartBuffer();
    buf.writeUInt32LE(0);
    buf.writeUInt16LE(0); //사용 스킬 포인트
    buf.writeUInt16LE(0); //현재 스킬 포인트
    buf.writeUInt16LE(3);
    buf.writeUInt8(12); //가지고 있는 스킬 개수

    buf.writeUInt32LE(12040011);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12070011);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12000211);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12100011);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(111);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(11160111);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(11);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12090011);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12080011);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12110011);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12000411);
    buf.writeUInt32LE(0);
    buf.writeUInt32LE(12001211);
    buf.writeUInt32LE(0);

    buf.writeUInt8(6);

    for (let i = 0; i < 6; i++) {
      buf.writeUInt16LE(i);
      for (let l = 0; l < 3; l++) {
        buf.writeUInt32LE(0);
      }
    }
    buf.writeUInt32LE(0);

    const enc = packetHandler.encrypt({ opcode: "0x0670", data: buf.toBuffer() });
  }

  handleCharacterInfo() {
    const buf = SmartBuffer.fromBuffer(this._data); //buf.readUInt32LE()
    const char = character.getCharacterData(this._session.character, true);
    this._session.getClient().write(packetHandler.encrypt({ opcode: opCode.character.ServerResCharacterInfo, data: char }));
    this.handleSkillTest();
    this.handleCharacterGesture();
    /*this._session.getClient().write(
      packetHandler.encrypt({
        opcode: "0x0670",
        data: Buffer.from(
          "000000000000000003000c8b53b800000000006f00000000000000bbc8b80000000000d31bb700000000009b7ab800000000000b000000000000004bb7b700000000002f4aaa00000000007b2cb800000000009b1cb70000000000bb1fb70000000000aba1b80000000000060000d31bb7009b1cb700bb1fb7000000000001009b1cb7000000000000000000000000000200bb1fb7000000000000000000000000000300000000000000000000000000000000000400000000000000000000000000000000000500000000000000000000000000000000000000000000000000",
          "hex"
        ),
      }),
      () => {
        console.log("클라이언트 1!");
      }
    );

    this._session
      .getClient()
      .write(packetHandler.encrypt({ opcode: "0x2303", data: Buffer.from("581b0000591b00005a1b00005b1b00005c1b00005d1b0000", "hex") }), () => {
        console.log("클라이언트 2!");
      });

    this._session.getClient().write(
      packetHandler.encrypt({
        opcode: "0x0334",
        data: Buffer.from(
          "00010000000ccccc2c4223000000803f1d000000c8420e0000c08f440a0000c08f4401000000f040180000f048441a000000c84213000000c84212000000403f2b000000064315006666f6421400",
          "hex"
        ),
      }),
      () => {
        console.log("클라이언트 3!");
      }
    );*/

    //요기까지

    /* this._session.getClient(
      packetHandler.encrypt({
        opcode: "0x0670",
        data: Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], "hex"),
      })
    );
    this._session.getClient(
      packetHandler.encrypt({
        opcode: "0x2302",
        data: Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], "hex"),
      })
    );
    this._session.getClient().write(Buffer.from("02002b000163320e233f0b623b82733b0b603b0b603b0b603b0b603b81733b0b603a0a603b0b603b0b603b", "hex"));

    this._session
      .getClient()
      .write(
        Buffer.from(
          "02000d00014b380e233f0b603b02001300014a130b603b0b603b0b603b0b603b0200870001780e14603b0bcb71316089415a3bbc2a010b717031602e405a3b7a2b010b12703160aa7b5a3b9910010b9b4b3160c67b5a3b0911010b6a4a31603e935a3b0cf8010b6ba3316036935a3b04f8010b75a3316020935a3b2af8010b43a331601e935a3b21f8010b50a331600d935a3b31f8010b5ca331606a935a3b7bf8010b19a3316002000f0001673e0a603b0b80f60b600200150001483a0b60390b603b0b603b0b603b0b6002000b0001647f0e233f0b",
          "hex"
        )
      );

    this._session.getClient().write(Buffer.from("0200070001630b", "hex"));

    this._session
      .getClient()
      .write(
        Buffer.from(
          "0200230401443a0b643b18473b0b663be4a82b0b613b0b603b0bdf4c54603b0b603bb417640b603b0be02b723f3b0b603b0b603b0bb2f60b60c8c3703b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0bee7419603a0b603b0b60847c3f3b0b603b0bdf4c54603b0b60bb1b19640b603b0b603b0b60e9c6603b2fb6280b613b0b603b0bdf4c54603b0b603bb417640b603b0be02b723f3b0b603b0b603b0bb2f60b60d357753b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0b8eaa2a603909603b0b0028733f3b0b603b6b734354603b0b604b2a18640b603b0b603b0b603b0b603b2e473b0b673bf6a82b0b613b0b603b0bdf4c54603b0b603bb417640b603b0be02b723f3b0b603b0b603b0bb2f60b603ec2703b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0bf17419603a0b603b0b60847c3f3b0b603b0bdf4c54603b0b60bb1b19640b603b0b603b0b60e9c6603b39b6280b613b0b603b0bdf4c54603b0b603bb417640b603b0be02b723f3b0b603b0b603b0bb2f60b60f457753b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0b57302b603909603b0b101a733f3b0b603b7b414354603b0b60bb2418640b603b0b603b0b603b0b603b253d2e0b633b0b603b8bd26554603b0b60bbb93e640b603b0be0048d3f3b0b603b0b603b0bb2c70660142c603b0d6037c2703b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0b78f21b603a0b603b0b60847c3f3b0b603b0bdf4c54603b0b60bb1b19640b603b0b603b0b60e9c6603bad2f290b613b0b603b0bdf4c54603b0b603bb417640b603b0be02b723f3b0b603b0b603b0bb2f60b6071dd733b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0bba671e603a0b603b0b60847c3f3b0b603b0bdf4c54603b0b60bb1b19640b603b0b603b0b60e9c6603b4a6b1b0b62390b603b8b4f4354603b0b60bb2418640b603b0bf006733f3b0b603b0b603b0b603b0b60022c603b0d6017c2703b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0b5bf21b603a0b603b0b60847c3f3b0b603b0bdf4c54603b0b60bb1b19640b603b0b603b0b60e9c6603bc82f290b613b0b603b0bdf4c54603b0b603bb417640b603b0be02b723f3b0b603b0b603b0bb2f60b6062dd733b0a603b0b603bb417640b603b0b60847c3f3b0b603b8b704254603b0b603b0b603bd9ad3b0b9a671e603a0b603b0b60847c3f3b0b603b0bdf4c54603b0b60bb1b19640b603b0b603b0b60e9c6603b536b1b0b623b0b603b9b5d4354603b0b60ab3618640b603b0bc070733f3b0b603b0b603b0b92330b6002000e0001473a0e233f0b603b0a0200140001493a0a613b4867faab613b0b603b0b02000e0001635fc360fe0b603b0b0200a90001634a0adc2f36609501603b0b603b0b603b0b603b0b60450380c40a1e43ebef3a09783b8b673d1380ba0462c3eb9f380568db8a60c5f2603b0b1e03ebef2409585b0be02a09603b0b603b0b603b0b603b0b607b0b603b0a603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b57463b0160040b653b1c603a0b613b",
          "hex"
        )
      );*/
  }

  handleGoCharacterInfo() {
    const buf = SmartBuffer.fromBuffer(this._data); //buf.readUInt32LE()
    const char = character.getCharacterData(this._session.character, false);
    const smbuf = SmartBuffer.fromBuffer(char);
    smbuf
      .writeUInt16LE(10003)
      .writeBigUInt64LE(BigInt(0))
      .writeFloatLE(10444.9951)
      .writeFloatLE(10179.7461)
      .writeFloatLE(100.325394)
      .writeFloatLE(0)
      .writeFloatLE(0);
    this._session.getClient(packetHandler.encrypt({ opcode: opCode.character.ServerResCharacterInfo, data: char }));
  }

  sendServerSpritWorker() {
    const buf = new SmartBuffer()
      .writeUInt32LE(0)
      .writeUInt8(1)
      .writeUInt16LE(10003)
      .writeUInt16LE(101)
      .writeInt16LE(256)
      .writeUInt16LE(10003)
      .writeUInt16LE(256)
      .writeFloatLE(0)
      .writeFloatLE(0)
      .writeFloatLE(100)
      .writeFloatLE(0)
      .writeUInt32LE(0)
      .writeUInt8(0)
      .toBuffer();
    this._session.getClient().write(packetHandler.encrypt({ opcode: "0x0322", data: buf }), () => {
      console.log("클라이언트 sendServerSpritworker!");
    });
  }

  sendServerUnknown1() {
    const res = new SmartBuffer()
      .writeUInt32LE(this._session.getAccountKey())
      .writeUInt8(1)
      .writeUInt16LE(10003)
      .writeBigUInt64LE(BigInt(0))
      .writeFloatLE(10444.9951)
      .writeFloatLE(10179.7461)
      .writeFloatLE(100.325394)
      .writeUInt8(0)
      .writeUInt32LE(0);
    this._session.getClient().write(
      packetHandler.encrypt({
        opcode: "0x0322",
        data: res.toBuffer(),
      })
    );
  }

  sendServerVersion(cb) {
    this._session.getClient().write(
      packetHandler.encrypt({
        opcode: "0x0404", ///0x0404 0x0656
        data: new SmartBuffer() /*
          .writeUInt32LE(16777221)
          .writeUInt32LE(352324352)
          .writeUInt32LE(0)
          .writeUInt32LE(150994944)
          .writeUInt32LE(1628151392)
          .writeUInt16LE(12657)*/
          .writeUInt32LE(0)
          .writeUInt32LE(1)
          .writeUInt32LE(0x0322)
          .writeUInt32LE(0x3bbb)
          .toBuffer(),
      }),
      () => {
        cb();
      }
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

  execute(opcode, data, loop = false) {
    this._opcode = opcode;
    this._data = data;

    switch (this._opcode) {
      case opCode.server.ClientReqWorldServerConnection:
        this.handleClientEnterGameServer();
        break;
      case opCode.character.ClientReqCharacterInfo:
        this.handleCharacterInfo();
        //this.handleGoCharacterInfo();
        break;
      case "0x0347":
        this._session.getClient().write(packetHandler.encrypt({ opcode: "0x0347", data: Buffer.from("01000000010f000000a041", "hex") }));
        break;
      case "0x0106":
        //this._session.getClient().write();
        break;
      /*case "0x0347":
        this._session
          .getClient()
          .write(
            Buffer.from(
              "0200480001637c0e233f0b6a3b0b603b4b203f0b603bcb20310b603bcb20360b603b1b21350b603b4b202e0b603b53221a0b603bab20080b603bab210e0b603bc3220d0b603bab22",
              "hex"
            )
          );
        break;
      case "0x0106":
        this._session.getClient().write(Buffer.from("0200230001433a590a170be8280b6054f75d7d9551394de03fc322fbf453faf7d7e2ca", "hex"));
        break;*/
      default:
        //     if (!loop) return this.execute(opcode, data, true);
        console.error("모르는거!", this._opcode, this._data.toString("hex"));
        break;
    }
  }
}
module.exports = GameHandler;

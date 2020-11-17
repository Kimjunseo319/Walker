const { SmartBuffer } = require("smart-buffer");
const sha = require("sha256");

const Handler = require("../../Utils/Handler");
const { opCode } = require("../../utils/opcode");

const AccountModel = require("../../Utils/models/Account");
const packetHandler = require("../../Utils/packetHandler");

const Option = require("../../../option.json");

const salt = "@#*!_@#(ASD#&$^$!$@!D+!+_2531AFpgFD@#($*!@[/#+As+!@#)$";

class LoginHandler extends Handler {
  constructor(session) {
    super(session);
  }

  getAccountInfo() {
    const buf = SmartBuffer.fromBuffer(this._data);
    return {
      id: buf.readString(buf.readUInt16LE(), "utf16le"),
      password: buf.readString(buf.readUInt16LE(), "utf16le"),
      mac: buf.readString(buf.readUInt16LE(), "utf16le"),
      leftover: buf.readUInt32LE(),
    };
  }

  handleClientLogin() {
    const { id, password, mac } = this.getAccountInfo();
    const pwd = sha(password + salt);

    console.log(id, password, mac);
    AccountModel.findOne({ ID: id }, (err, account) => {
      if (err) throw new Error(err);
      if (account.Password !== pwd) {
        console.error("비밀번호가 일치하지 않습니다!");
        this._session.setRandomSessionKey(); //!세션키 공백 오류 방지용!
        this.sendLoginData(id, mac, "비밀번호문제", true);
      } else {
        this._session.initSession(id, () => {
          account.IP = this._session.getClient().address().address;
          account.MAC = mac;
          account.SessionKey = this._session.getSessionKey();
          account.LastLoginTime = Date.now();
          account.save();
          this.sendLoginData(id, mac);
        });
      }
    });
  }

  handleServerList() {
    const ServerList = new SmartBuffer().writeUInt8(0).writeUInt8(Option.ServerList.length);

    const accountKey = this._data.readUInt32LE();
    AccountModel.findOne({ AccountKey: accountKey }, (err, account) => {
      if (err) console.error(err);
      for (const [i, server] of Object.entries(Option.ServerList)) {
        ServerList.writeUInt16LE(Number(i) + 1);
        ServerList.writeUInt16LE(10100);
        ServerList.writeUInt16LE(server.name.length);
        ServerList.writeString(server.name);
        ServerList.writeUInt16LE(server.ip.length);
        ServerList.writeString(server.ip);
        ServerList.writeUInt32LE(1);
        ServerList.writeUInt16LE(0); //서버 혼잡도
        ServerList.writeUInt16LE(0);
        ServerList.writeUInt8(err ? 0 : account.Characters.length);
      }

      const encData = {
        opcode: opCode.server.ServerResServerList,
        data: ServerList.toBuffer(),
      };
      const encrypt = packetHandler.encrypt(encData);
      this._session.getClient().write(encrypt);

      //Send Server Option
      this._session
        .getClient()
        .write(
          Buffer.from(
            "02005a0801620a3d510b3a500b3b510b3b500a3a510a3a51093a500a3b500b3b510b3a511b2b401b2b401b2b401b2b401b2b401b2b401b2b401b2b401b2b401b2b401b2b401b0b603b0b603b0a603b0a613a0a613a0a842509606e7b5d093a54004f0f4c655d093a500047055d7f5d0a32520059095c6314063a590e302a4e6610063a550230254d6a045e365109325b7a7e145459155536520a3a5b6f7e12554a12547e0e5f36520b325b7f6e065a7e0c4f4a144f6a035036510b3b5b687b05586201574a144f6a035036510b395b687e026c6e014b640e7a7f145a680b063a500a3022496e0150580b52670c063a5809302e5a7d0968600957675d093a57005e135e580b52670c0a36510c3d5b6e7805686009576752063a570c3035486e3350620c57385d0a3c58005e135e580b52670c0f36510c325b6e7805686009576755063a580b3035486e3350620c573d5d0a3351005e135e42145e6651063950033035486e294f6e0d093651023d5b6e7805727f0556385d0a3851103950033035486e294f6e0d0f3651083a4b0a3256005e135e4a0b5a78085268510639530c3035486e21506a1353620309365208335b6e78057a600148630958385d093859005e135e4a0b5a78085268540639540b3035486e21506a135362030e36520f3a5b6b6203507e10727f05563651023c5b7a600148630958460f5f6e23536a0e5c6e5d0a3957005808547c375e6a1054655d093a550058054f5f01496c054f3651093c5b687e104b64124f6e126a7e0958605d0a39570058154b7b0f497f05495905576e01486e5d0a395700510f5466295536510b385b61640f5644154f36510b3f5b6964145a7f095465354b36510e3e5b6964145a7f09546524547c0e063a550d3032547f014f620f5547055d7f5d0a3e5700590f4f6a1452640e696207537f5d0a3e58005e297664045e48085a65075e365108385b6e4228526f05063a580d3023536a125a68145e7929556d0f6e425d093b5700420e4d6e0e4f6412425e290639500b303350620c575e290639500930314e6e134f5e290639500a302354660d4e65094f72357236520b3d5b7a6808526e165e6605557f357236520b385b776e015c7e056e425d0a325800461969640f56365102325b736e0c4b6e12063a520c30305a79144258055a79035336520b3e5b766e0d5479095a675d0a3253005f125a6f050639550c302d5a7b357236520b3f5b6872134f6e0d766e0e4e4a0e5f480c547805063a550f302b5e72285e67100639540930235a780868630f4b3651023f5b7a60014863095859055864125f490f54605d093d50005901556009556c5d093d5300460158790f7863014f3a5d093f5300460158790f7863014f395d093f5400460158790f7863014f385d093f5500460158790f7863014f3f5d093f5600460158790f7863014f3e5d093f5700460158790f7863014f3d5d093f5800460158790f7863014f3c5d0a395700460158790f7863014f335d0a395700460158790f7863014f325d0a395700460158790f7863014f3a50063a520c30325a6f095448085a7f51063a520c30325a6f095448085a7f52063a520c30325a6f095448085a7f53063a520c30325a6f095448085a7f54063a520c30325a6f095448085a7f55063a520c30325a6f095448085a7f56063a520c30335e7f30496e166f6a125c6e14063a520c30335e7f2e5e73146f6a125c6e14063a520c30335879055e6533536414063a58030b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b",
            "hex"
          )
        );

      //Send to Client OK
      this._session
        .getClient()
        .write(
          Buffer.from(
            "603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b603b0b",
            "hex"
          )
        );
    });
  }

  handleServerInfo() {
    const sv_ip = "127.0.0.1";
    const sv_port = 10100;

    const ServerInfo = new SmartBuffer().writeUInt16LE(sv_ip.length).writeString(sv_ip, "utf-8").writeUInt16LE(sv_port);

    const encData = {
      opcode: opCode.server.ServerResServerConnection,
      data: ServerInfo.toBuffer(),
    };

    const encrypt = packetHandler.encrypt(encData);

    this._session.getClient().write(encrypt);
  }

  sendLoginData(id, mac, errmsg = "", iserr = false) {
    const AuthRes = new SmartBuffer()
      .writeUInt32LE(this._session.getAccountKey())
      .writeUInt8(1)
      .writeString(mac)
      .writeUInt16LE(errmsg.length * 2)
      .writeString(errmsg, "utf16le")
      .writeUInt16LE(iserr ? 1 : 0)
      .writeString("")
      .writeUInt32LE(0)
      .writeUInt8(0)
      .writeUInt8(1)
      .writeUInt16LE(id.length * 2)
      .writeString(id, "utf16le")
      .writeBigUInt64LE(this._session.getSessionKey())
      .writeUInt32LE(0)
      .writeUInt8(0)
      .writeUInt16LE(0)
      .writeUInt8(0)
      .writeUInt8(0)
      .writeUInt8(0);

    const encData = {
      opcode: opCode.login.ServerResLogin,
      data: AuthRes.toBuffer(),
    };

    const encryptData = packetHandler.encrypt(encData);

    this._session.getClient().write(encryptData);
  }

  execute(opcode, data) {
    this._opcode = opcode;
    this._data = data;

    switch (this._opcode) {
      case opCode.login.ClientReqLogin:
        this.handleClientLogin();
        break;
      case opCode.server.ClientReqServerList:
        this.handleServerList();
        break;
      case opCode.server.ClientReqServerConnection:
        this.handleServerInfo();
      default:
        console.error("모르는거!", this._opcode, this._data.toString("hex"));
        break;
    }
  }
}

module.exports = LoginHandler;

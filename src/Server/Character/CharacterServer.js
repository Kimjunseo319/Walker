const net = require("net");
const packetHandler = require("../../Utils/packetHandler");
const CharacterSession = require("../Sessions/CharacterSession");
const CharacterHandler = require("./CharacterHandler");

const characterServer = net.createServer((client) => {
  console.log(`[Character Server] ${client.address().address}:${client.remotePort}에서 접속됨!`);
  client.on("data", (chunk) => {
    try {
      if (chunk[0] !== 2) return;

      const packet = packetHandler.getPacket(chunk);
      console.log(packet.packet.opcode, packet.packet.data.toString("hex"));

      let session = CharacterSession.getSession(client);
      if (!session) {
        session = new CharacterSession(client);
        session.setHandler(CharacterHandler);
      }
      session.getHanlder().execute(packet.packet.opcode, packet.packet.data);
    } catch (err) {
      console.error(err);
    }
  });

  client.on("end", () => {
    let session = CharacterSession.getSession(client);
    session.destroySession();
    console.log("[Character Server] 클라이언트 접속 종료");
  });

  client.on("error", (err) => {
    if (err.message === "read ECONNRESET") {
      client.emit("end");
    } else {
      console.error("[Character Server] !!!에러!!!");
      console.error(err);
    }
  });
});

module.exports = characterServer;

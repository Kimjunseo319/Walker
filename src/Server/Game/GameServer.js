const net = require("net");
const packetHandler = require("../../Utils/packetHandler");
const GameSession = require("../Sessions/GameSession");
const GameHandler = require("./GameHandler.js");

const gameServer = net.createServer((client) => {
  console.log(`[Game Server] ${client.address().address}:${client.remotePort}에서 접속됨!`);
  client.on("data", (chunk) => {
    try {
      if (chunk[0] !== 2) return;

      const packet = packetHandler.getPacket(chunk);
      console.log(packet.packet.opcode, packet.packet.data.toString("hex"));

      let session = GameSession.getSession(client);
      if (!session) {
        session = new GameSession(client);
        session.setHandler(GameHandler);
      }
      session.getHanlder().execute(packet.packet.opcode, packet.packet.data);
    } catch (err) {
      console.error(err);
    }
  });

  client.on("end", () => {
    let session = GameSession.getSession(client);
    session.destroySession();
    console.log("[Game Server] 클라이언트 접속 종료");
  });

  client.on("error", (err) => {
    if (err.message === "read ECONNRESET") {
      client.emit("end");
    } else {
      console.error("[Game Server] !!!에러!!!");
      console.error(err);
    }
  });
});

module.exports = gameServer;

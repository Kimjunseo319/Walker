const net = require("net");
const packetHandler = require("../../Utils/packetHandler");
const LoginSession = require("../Sessions/LoginSession");
const LoginHandler = require("./LoginHandler");

const loginServer = net.createServer((client) => {
  console.log(`[Login Server] ${client.address().address}:${client.remotePort}에서 접속됨!`);
  client.on("data", (chunk) => {
    if (chunk[0] !== 2) return;
    const packet = packetHandler.getPacket(chunk);
    console.log(packet.packet.opcode, packet.packet.data.toString("hex"));

    let session = LoginSession.getSession(client);
    if (!session) {
      session = new LoginSession(client);
      session.setHandler(LoginHandler);
    }
    session.getHanlder().execute(packet.packet.opcode, packet.packet.data);
  });

  client.on("end", () => {
    let session = LoginSession.getSession(client);
    session.destroySession();
    console.log("[Login Server] 클라이언트 접속 종료");
  });

  client.on("error", (err) => {
    if (err.message === "read ECONNRESET") {
      client.emit("end");
    } else {
      console.error("[Login Server] !!!에러!!!");
      console.error(err);
    }
  });
});

module.exports = loginServer;

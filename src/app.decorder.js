const readline = require("readline");
const { searchOpcode } = require("./Utils/opcode");
const packetHandler = require("./Utils/packetHandler");

function readLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", function (line) {
    const { header, packet } = packetHandler.getPacket(Buffer.from(line, "hex"));

    console.log(header, { opcode: searchOpcode(packet.opcode) + `(${packet.opcode})`, data: packet.data.slice(0, header.size).toString("hex") });
  }).on("close", function () {});
}
readLine();

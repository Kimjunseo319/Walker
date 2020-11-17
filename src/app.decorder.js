const readline = require("readline");
const packetHandler = require("./Utils/packetHandler");

function readLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", function (line) {
    console.log(packetHandler.getPacket(Buffer.from(line, "hex"), true));
  }).on("close", function () {});
}
readLine();

const fs = require("fs");

function loadCommand() {
  const path = __dirname.replace("\\Utils", "") + "\\Server\\Game\\Commands";

  let reload = false;

  if (global.cmdList !== undefined) reload = true;

  global.cmdList = {};
  fs.readdir(path, (err, list) => {
    if (err) console.error(err);
    list.forEach((cmd) => {
      if (reload) {
        delete require.cache[require.resolve(path + "/" + cmd)];
      }
      global.cmdList[cmd.replace(".js", "")] = require(path + "/" + cmd);
    });
  });
  console.log(global.cmdList);
}

module.exports = {
  loadCommand: loadCommand,
};

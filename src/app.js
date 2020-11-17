const database = require("./Utils/database");
const Session = require("./Server/Sessions/Session");

const LoginServer = require("./Server/Login/LoginServer");
const characterServer = require("./Server/Character/CharacterServer");
const gameServer = require("./Server/Game/GameServer");

global.SessionList = [];

function start() {
  LoginServer.listen(10000, "0.0.0.0");
  console.log("LoginServer Start!");
  characterServer.listen(10100, "0.0.0.0");
  console.log("CharacterServer Start!");
  gameServer.listen(10200, "0.0.0.0");
  console.log("Game Server Start!");
  database.conn();
}

start();

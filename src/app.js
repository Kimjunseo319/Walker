const database = require("./Utils/database");
const Session = require("./Server/Sessions/Session");

const LoginServer = require("./Server/Login/LoginServer");
const characterServer = require("./Server/Character/CharacterServer");
const gameServer = require("./Server/Game/GameServer");

const TableReader = require("./Utils/TableReader");
const PhotoTable = require("./Utils/tables/PhotoTable");
const { loadCommand } = require("./Utils/CommandLoader");
const VBatch = require("./Utils/structs/VXml/Vbatch");
const GameMap = require("./Utils/structs/World/GameMap");

global.SessionList = [];
global.VBatchs = {};
global.gameMaps = {};

function start() {
  loadCommand();
  getTableDatas();
  VBatch.readAllVBatch();
  GameMap.createGameMapDefault();
  LoginServer.listen(10000, "0.0.0.0");
  console.log("[Login Server] Start!");
  characterServer.listen(10100, "0.0.0.0");
  console.log("[Character Server] Start!");
  gameServer.listen(10200, "0.0.0.0");
  console.log("[Game Server] Start!");
  database.conn();
}

function getTableDatas() {
  global.tables = { photos: TableReader.readTable("tb_Photo_Item", PhotoTable) };
}

start();

const Session = require("./Server/Sessions/Session");
const Account = require("./Utils/models/Account");

const database = require("./Utils/database");
const { SmartBuffer } = require("smart-buffer");
const TableReader = require("./Utils/TableReader");

const MapTable = require("./Utils/tables/MapTable");
const ItemTable = require("./Utils/tables/ItemTable");
const SkillTable = require("./Utils/tables/SkillTable");

database.conn();

function test() {
  Account.findOne({ AccountKey: 240374642 }, (err, account) => {
    Object.keys(account.Characters).filter(function (key) {
      console.log(account.Characters[key]);
      if (account.Characters[key].CharID === 2528382229) {
        console.log("Find!", account.Characters[key]);
        account.Characters[key].remove();
        account.save();
      }
    });
  });
}

function testproto() {
  try {
    //TableReader.readTable("tb_district", MapTable);
    //TableReader.readTable("tb_item", ItemTable);
    TableReader.readTable("tb_Skill", SkillTable);
    while (true) {}
  } catch (err) {
    console.error(err);
  }
}

//test();
testproto();

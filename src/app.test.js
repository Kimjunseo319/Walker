const Session = require("./Server/Sessions/Session");
const Account = require("./Utils/models/Account");

const database = require("./Utils/database");
const { SmartBuffer } = require("smart-buffer");
const TableReader = require("./Utils/TableReader");

const MapTable = require("./Utils/tables/MapTable");
const ItemTable = require("./Utils/tables/ItemTable");
const GestureTable = require("./Utils/tables/GestureTable");

const SkillTable = require("./Utils/tables/SkillTable");

const ClassInfoTable = require("./Utils/tables/ClassInfoTable");
const FashionItem = require("./Utils/structs/Items/FashionItem");
const Inventory = require("./Utils/structs/Characters/Inventorys/Inventory");
const FashionInventory = require("./Utils/structs/Characters/Inventorys/FashionInventory");
const Stats = require("./Utils/structs/Characters/Stats");
const CharacterClass = require("./Utils/structs/Characters/Classes/CharacterClass");
const SkillPreset = require("./Utils/structs/Characters/Skills/SkillPreset");
const Position = require("./Utils/structs/Characters/Position");
const Appearance = require("./Utils/structs/Characters/Appearance");
const PhotoTable = require("./Utils/tables/PhotoTable");
const Gesture = require("./Utils/structs/Characters/Gesture");
const WeaponItem = require("./Utils/structs/Items/WeaponItem");
const CharacterList = require("./Utils/structs/CharacterList");
const CharacterSession = require("./Server/Sessions/CharacterSession");
const CharacterUtil = require("./Server/Character/CharacterUtil");
const ItemScriptTable = require("./Utils/tables/ItemScriptTable");
const GameUtil = require("./Server/Game/GameUtil");
const GameHandler = require("./Server/Game/GameHandler");
const ChatHandler = require("./Server/Game/Handlers/ChatHandler");
const { loadCommand } = require("./Utils/CommandLoader");
const FriendHandler = require("./Server/Game/Handlers/FriendHandler");
const VBatch = require("./Utils/structs/VXml/Vbatch");
const Npc = require("./Utils/structs/VXml/structs/Npc");

global.SessionList = [];
global.VBatchs = {};
database.conn();
getTableDatas();

function getTableDatas() {
  global.tables = { photos: TableReader.readTable("tb_Photo_Item", PhotoTable) };
}

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
    TableReader.readTable("tb_district", MapTable);
    //TableReader.readTable("tb_Gesture", GestureTable);
    //TableReader.readTable("tb_item", ItemTable);
    //TableReader.readTable("tb_Skill", SkillTable);
    //TableReader.readTable("tb_ClassSelect_Info", ClassInfoTable);
    while (true) {}
  } catch (err) {
    console.error(err);
  }
}

function invtest() {
  const item = new FashionItem(-1, -1, 201010107, 0, 7);
  const item2 = new FashionItem(-1, -1, 201011101, 0, 9);
  const item3 = new FashionItem(-1, -1, 201011201, 0, 10);

  const inv = new FashionInventory();
  inv.createInventory(item, item2, item3);

  console.log(inv.toBuffer().toString("hex"));
}

function statTest() {
  const stat = new Stats()
    .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
    .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

  console.log(stat.getGrowStats());
}

function createCharacterTest() {
  const stat = new Stats()
    .setBaseStats(750, 2.5, 262.5, 28.8, 36.0, 28.8, 1.0, 801.25, 0.25)
    .setGrowStats(400, 5.0, 140.0, 14.4, 18.0, 14.4, 0, 2.5, 0.5);

  const appearance = new Appearance().setFashions(1101).setColors(2101, 5101, 3101);

  const photo = PhotoTable.getPhoto(1008);

  const weapon = new WeaponItem(111011301, 0);

  const fashioninv = new FashionInventory();

  const items = [new FashionItem(-1, -1, 201010107, 0, 7), new FashionItem(-1, -1, 201011101, 0, 9), new FashionItem(-1, -1, 201011201, 0, 10)];

  fashioninv.createInventory(items);

  const char = new CharacterClass(
    stat,
    new SkillPreset(),
    new Position(10000.0, 10000.0, 100.0, 0.0),
    appearance,
    photo,
    new Gesture(),
    weapon,
    fashioninv
  );

  char.characterID = 165123;
  char.userName = "삼다수";
  char.classType = CharacterClass.classTable.Haru;
  char.classAdvance = 0;
  char.level = 30;

  //  const buf = new SmartBuffer().writeBuffer(char.toBuffer()).toBuffer();

  const characterList = new CharacterList(char);

  console.log(characterList.toBuffer().toString("hex"));
}

function testLoadCharacter() {
  new CharacterSession(null).initSession({ accountKey: 240376543, sessionKey: 390262832042199146 }, () => {
    console.log("done!");
  });
}
/*
setTimeout(() => {
  try {
    testLoadCharacter();
  } catch (err) {
    console.error(err);
  }
}, 300);
*/

function bufTest() {
  const buf = new SmartBuffer().writeUInt16LE(1).writeUInt16LE(2).writeUInt16LE(3);
  console.log(buf.readUInt16LE());
  buf2(buf);
  console.log(buf.readUInt16LE());
}

function buf2(buf) {
  console.log(buf.readUInt16LE());
}

function createCharacterTestV2() {
  const buf = SmartBuffer.fromBuffer(
    Buffer.from(
      "ffffffff0c004400530044004f0044004f00010000000000000000004d043508ed131d0c0000000000000000010000000000000000000000ffffffff00ffffffffffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff00000000ffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000803f0000803f000000000000000000000000000000000000000000000000050000000000000000008d000000",
      "hex"
    )
  );

  const session = new Session(null);
  session._accountKey = 240376543;
  session._sessionKey = 390262832042199146;

  const char = CharacterUtil.createCharacter(buf, session);
  CharacterUtil.saveNewCharacter(char);
}

function sessionTest() {
  const char = new CharacterSession(null);
  char._accountKey = 240376543;
  char._sessionKey = 390262832042199146;
  char.initSession({ accountKey: char._accountKey, sessionKey: char._sessionKey }, () => {
    console.log(char.characters.toBuffer(char).toString("hex"));
  });
}

function charListTest() {}

function itemTable() {
  const items = TableReader.readTable("tb_Item", ItemTable);
  const scripts = TableReader.readTable("tb_item_script", ItemScriptTable);
  const arr = [];
  items.forEach((item) => {
    const find = scripts.filter((s) => {
      return s.id == item.id;
    });
    if (find.length !== 0) {
      const data = { item: item, script: find[0] };
      arr.push(data);
    }
  });
  console.log(arr);
}

async function charFashionError() {
  const char = await CharacterUtil.getCharacterFromDB(1080580672, 240376543);
  const buf = char.toBuffer();
  console.log(buf.toString("hex"));
  const buf2 = char.toMetadataBufferRaw();
  console.log(buf2.toString("hex"));
  const buf3 = SmartBuffer.fromBuffer(buf).writeBuffer(buf2).toBuffer().toString("hex");
  console.log(buf3);
}

function chatCMD() {
  loadCommand();
}

function customEvent() {
  new LoginEvent().register();
  LoginEvent.test();
}

//new FriendHandler().findFriends(Buffer.from("060074C798B044BE", "hex"));
//chatCMD();
//testproto();
try {
  //new VBatch("F031_ROCCOTOWN");
  /*VBatch.readAllVBatch();
  testproto();

  global.getNpcs = Npc.getNpcs;*/

  const classType = 2;
  const cloth = 321;

  const c = new FashionInventory().setDefaultClothes(classType, (cloth - 100 * classType - 1) / 10);
  console.log(c);
} catch (err) {
  console.log(err);
  //throw new Error(err);
}
//bufTest();
//createCharacterTest();

//console.log(PhotoTable.getPhoto(1008));

//test();
//testproto();
//test2();
//invtest();
//statTest();

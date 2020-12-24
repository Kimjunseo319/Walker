const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppearanceSchema = new Schema({
  Hair: Number,
  HairColor: Number,
  EyeColor: Number,
  SkinColor: Number,
});

const StatSchema = new Schema({
  Level: Number,
  Weapon: Number,
  WeaponUpgrade: Number,
});

const FashionSchema = new Schema({
  unk1: Number,
  unk2: Number,
  ID: Number,
  dye: Number,
  pos: Number,
});

const InventorySchema = new Schema({
  Fashion: [FashionSchema],
});

const characterSchema = new Schema({
  ID: Number,
  Index: Number,
  UserName: String,
  ClassType: Number,
  ClassAdvance: Number,
  Photo: Number,
  Appearance: AppearanceSchema,
  Stat: StatSchema,
  Inventory: InventorySchema,
});

module.exports = mongoose.model("character", characterSchema);

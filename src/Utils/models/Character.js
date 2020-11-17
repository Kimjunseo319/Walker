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
  UniqueID: Number,
  Unknown: Number,
  ID: Number,
  Dye: Number,
});

const characterSchema = new Schema({
  ID: Number,
  UserName: String,
  ClassType: Number,
  BeyondStatus: Number,
  Illust: Number,
  Unknown1: Number,
  Unknown2: Number,
  Unknown3: Number,
  Appearance: AppearanceSchema,
  Stat: StatSchema,
  Fashion: [FashionSchema],
});

module.exports = mongoose.model("character", characterSchema);

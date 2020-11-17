const mongoose = require("mongoose");

require("mongoose-long")(mongoose);

const Schema = mongoose.Schema;
const {
  Types: { Long },
} = mongoose;

const accountCharacterSchema = new Schema({
  Index: Number,
  CharID: Number,
});

const accountSchema = new Schema({
  ID: String,
  Password: String,
  IP: String,
  MAC: String,
  AccountKey: Number,
  SessionKey: Long,
  Characters: [accountCharacterSchema],
  SoulCash: Number,
  LastLoginTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("account", accountSchema);

const mongoose = require("mongoose");

const db = mongoose.connection;

db.on("error", console.error);
db.once("open", () => {
  console.log("[DBManager]DB에 연결되었습니다!");
});

function conn() {
  mongoose.connect("mongodb://localhost/WalkerProject", { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {
  db: db,
  conn: conn,
};

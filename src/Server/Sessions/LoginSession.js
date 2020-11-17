const AccountModel = require("../../Utils/models/Account");
const Session = require("./Session");

class LoginSession extends Session {
  constructor(client) {
    super(client);
  }

  initSession(id, cb) {
    AccountModel.findOne({ ID: id }, (err, account) => {
      if (err) throw new Error(err);
      this.setAccountKey(account.AccountKey);
      this.setRandomSessionKey();
      //account.SessionKey = this.getSessionKey();
      //account.save();
      cb();
    });
  }
}

module.exports = LoginSession;

const AccountDB = require("../models/Account");
const CryptoUtil = require("bigint-crypto-utils");

class Account {
  constructor(accountKey, cb) {
    this.getAccount(accountKey, cb);
  }

  getAccount(accountKey, cb) {
    console.log(accountKey);
    AccountDB.findOne({ AccountKey: accountKey }, (err, account) => {
      if (err) throw new Error(err);
      console.log(account);
      this.accountDB = account;

      this.id = account.ID;
      this.IP = account.IP;
      this.MAC = account.MAC;
      this.accountKey = account.AccountKey;
      this.sessionKey = account.SessionKey;
      this.characterBG = account.CharacterBackground;
      this.soulCash = account.SoulCash;

      this.characters = account.Characters;
      cb();
    });
  }

  updateAccount() {
    this.getAccount(this.accountKey, () => {});
  }

  updateSessionKey() {
    const key = CryptoUtil.randBytesSync(8).readBigUInt64LE();
    if (!(-9223372036854775808n <= key && 9223372036854775808n > key)) {
      return this.updateSessionKey();
    }
    this.accountDB.SessionKey = key;
    this.sessionKey = key;

    this.accountDB.save();
  }

  fromBuffer() {}
}

module.exports = Account;

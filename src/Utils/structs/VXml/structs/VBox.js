class VBox {
  constructor(obj) {
    this.boxtype = obj.$.boxtype;
    Object.keys(obj).forEach((o) => {
      if (o === "$") return;
      obj[o] = obj[o][0].$;
    });
    this.obj = obj;
  }
}

module.exports = VBox;

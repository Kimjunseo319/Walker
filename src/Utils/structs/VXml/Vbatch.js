const fs = require("fs");
const parseString = require("xml2js").parseString;

const path = require("path");

const VBox = require("./structs/VBox");

const root = path.dirname(require.main.filename.replace("src", ""));

class VBatch {
  constructor(fileName) {
    this.fileName = fileName;
    fs.readFile(path.join(root, "tableData", "vbatch", fileName + ".vbatch"), (err, str) => {
      if (err) throw new Error(err);

      parseString(str.toString(), (err, xml) => {
        if (err) throw new Error(err);
        this.xml = xml.root;

        global.VBatchs[fileName] = this.xml;

        //console.log(this.xml);
        this.parseVBox();
      });
    });
  }

  parseVBox() {
    this.xml.Batchs.forEach((vroot) => {
      Object.keys(vroot).forEach((vs) => {
        if (vs === "$") return;
        vroot[vs].forEach((v) => {
          new VBox(v);
        });
      });
    });
  }

  static readAllVBatch() {
    fs.readdir(path.join(root, "tableData", "vbatch"), (err, files) => {
      files.forEach((vbatch) => {
        new VBatch(vbatch.replace(".vbatch", ""));
      });
    });
  }
}

module.exports = VBatch;

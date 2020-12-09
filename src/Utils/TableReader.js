const fs = require("fs");
const { SmartBuffer } = require("smart-buffer");

function readTable(table, wrapper) {
  const res = fs.readFileSync(`./tableData/${table}.res`);
  const buf = SmartBuffer.fromBuffer(res);

  const count = buf.readUInt32LE() - 1;
  console.log(count);
  //buf.readOffset = 58;
  let arr = [];
  for (let i = 0; i <= 0; i++) {
    const data = new wrapper(buf).loadData();
    console.log(data);
    arr.push({ data: data });
  }
  console.log(arr);
  //  const data = new wrapper(buf).loadData();
  //  console.log(data);
}

module.exports = {
  readTable: readTable,
};

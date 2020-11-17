const fs = require("fs");
const { SmartBuffer } = require("smart-buffer");

function readTable(table, wrapper) {
  const res = fs.readFileSync(`./tableData/${table}.res`);
  const buf = SmartBuffer.fromBuffer(res);

  const count = buf.readUInt32LE() - 1;
  console.log(count);
  let arr = [];
  for (let i = 0; i <= count; i++) {
    const data = new wrapper(buf).loadData();
    arr.push({ id: data.id, data: data });
  }
  console.log(arr);
}

module.exports = {
  readTable: readTable,
};

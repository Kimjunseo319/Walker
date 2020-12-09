const { opCode } = require("./opcode");

const crypto = require("crypto");
const { SmartBuffer } = require("smart-buffer");

// prettier-ignore
const key = Buffer.from([
    0x57, 0x19, 0xC6, 0x2D, 0x56, 0x68, 0x3A, 0xCC,
    0x60, 0x3B, 0x0B, 0xB1, 0x90, 0x5C, 0x4A, 0xF8,
    0x80, 0x28, 0xB1, 0x45, 0xB6, 0x85, 0xE7, 0x4C,
    0x06, 0x2D, 0x55, 0x83, 0xAF, 0x44, 0x99, 0x95,
    0xD9, 0x98, 0xBF, 0xAE, 0x53, 0x43, 0x63, 0xC8,
    0x4A, 0x71, 0x80, 0x9D, 0x0B, 0xA1, 0x70, 0x8A,
    0x0F, 0x54, 0x9C, 0x1B, 0x06, 0xC0, 0xEA, 0x3C,
    0xC0, 0x88, 0x71, 0x48, 0xB3, 0xB9, 0x45, 0x78,
])

/**
 *
 * @param {Buffer} encBuf
 */
function getPacket(encBuf, toString = false) {
  //if()
  const { header, packet } = getHeaderWithSlice(encBuf);
  const buf = getRawData(decrypt(packet));

  return {
    header: header,
    packet: toString ? { opcode: buf.opcode, data: buf.data.toString("hex") } : buf,
  };
}

/**
 * 복호화전 패킷의 헤더부분을 추출합니다
 * 이 작업은 decrypt가 실행되기전 실행되어야합니다
 * @param {byte[]} packet Client에게 받은 패킷
 */
function getHeaderWithSlice(packet) {
  const header = {
    magic: "0x0" + packet[0] + " 0x0" + packet[1],
    size: packet[2] + packet[3] - 5,
    sender: packet[4],
  };
  packet = packet.slice(5);
  return {
    header: header,
    packet: packet,
  };
}

/**
 * 암호화된 데이터를 복호화 해줍니다
 * 이 작업은 getRawData가 실행되기전 실행되어야하는 작업입니다
 * @param {Buffer} data Header가 제거된 암호화된 데이터
 */
function decrypt(data) {
  let buf = [];

  for (let i = 0, l = data.length; i < l; i++) {
    const byte1 = data[i];
    const index = 4 * 0x02 - 3 * Math.floor(i / 3) + i;
    const byte2 = key[index];
    buf.push(byte1 ^ byte2);
  }

  return Buffer.from(buf);
}

/**
 * 평문 데이터를 암호화해줍니다
 * 이 작업은 무조건 Client로 보내기전에 수행되어야 합니다.
 * @param {} data 데이터
 */
function encrypt({ opcode, data }) {
  console.log("sendData", opcode, data.toString("hex"));
  const { type, cmd } = opcodeFormatV2(opcode);
  const op = Buffer.alloc(2);
  op.set([type, cmd]);

  const combineData = Buffer.concat([op, data]);

  const header = new SmartBuffer()
    .writeUInt16LE(2)
    .writeUInt16LE(combineData.byteLength + 5)
    .writeUInt8(1)
    .toBuffer();

  const encdata = decrypt(combineData);

  const result = Buffer.concat([header, encdata]);

  console.log(`[PacketHandler] ${opcode} 요청 암호화됨!`);
  return result;
}

/**
 * 복호화된 Data에서 Opcode, RawData를 분리해줍니다.
 * 이 작업은 데이터 가공 전 무조건 거쳐야 하는 작업입니다
 * @param {Buffer} decdata 복호화된 데이터
 */
function getRawData(decdata) {
  return {
    opcode: "0x" + prettyHexFormat(decdata[0]) + prettyHexFormat(Number(decdata[1]).toString(16)),
    data: decdata.slice(2),
  };
}

function prettyHexFormat(hex) {
  const t_hex = hex.toString().length === 1 ? "0" + hex : hex;
  return t_hex;
}

/**
 *
 * @param {string} opcode
 */
function opcodeFormatV2(opcode) {
  const code = opcode.replace("0x", "");
  const middle = Math.ceil(code.length / 2);
  const type = "0x" + code.slice(0, middle);
  const cmd = "0x" + code.slice(middle);
  console.log({ type: type, cmd: cmd });
  return { type: type, cmd: cmd };
}

module.exports = {
  encrypt: encrypt,
  getPacket: getPacket,
};

const opcode = {
  login: {
    ClientReqLogin: "0x0201",
    ClientReqStoveLogin: "0x0217",
    ServerResLogin: "0x0202",
  },
  server: {
    ClientReqServerList: "0x0203",
    ServerResServerList: "0x0204",
    ClientReqServerConnection: "0x0205",
    ServerResServerConnection: "0x0211",
    ClientReqEnterCharacterServer: "0x0213",
    ServerResEnterCharacterServer: "0x0214",
    ServerResClientOption: "0x0231",
    ClientReqEndConnection: "0x0425",
    ClientReqLogout: "0x0419",
    ClientReqGameServerConnection: "0x0313",
    ServerResGameServerConnection: "0x0315", //0x0314? 0x0315?
    ClientReqWorldServerConnection: "0x0321",
    ServerResWorldServerConnection: "0x0322",
  },
  character: {
    ClientReqCharacterList: "0x0311",
    ServerResCharacterList: "0x0312",
    ClientReqCreateCharacter: "0x0301",
    ClientReqRemoveCharacter: "0x0302",
    ClientCharacterSelect: "0x0371",
    ClientReqCharacterSlotChangeView: "0x0313",
    ServerResCharacterSlotChangeView: "0x0313",
    ClientReqCharacterSlotChange: "0x0306",
    ServerResCharacterSlotChange: "0x0107", //?? 이거 잘 모르겠네 0x0318일수도?
    ClientReqCharacterSelect: "0x0347",
    ClientReqCharacterInfo: "0x0331",
    ServerResCharacterInfo: "0x0332",
  },
  game: {
    ServerResGuildInfo: "0x3407", //로딩중에 발견
  },
  world: {},
  misc: {
    ClientReqCharSelectBG: "0x0213",
    ServerResCharSelectBG: "0x0214",
    ServerResSendOption: "0x0231",
    ServerResCurrentDate: "0x0403",
    EveryBothSetCharSelectBG: "0x032c",
    EveryBothCharacterCustom: "0x030d", //Every 양쪽다 Both Req,Res 둘다
    EveryBothSecondPass: "0x0317",
  },
};

function searchOpcode(code) {
  let result = null;
  Object.keys(opcode).forEach((key) => {
    const serchOpcode = getOpcode(opcode[key], code);
    if (serchOpcode !== undefined) {
      result = serchOpcode;
    }
  });
  return result ? result : "unknownOpcode";
}

function getOpcode(obj, code) {
  const result = Object.keys(obj).filter(function (key) {
    return obj[key] === code;
  })[0];
  return result;
}

module.exports = {
  opCode: opcode,
  searchOpcode: searchOpcode,
};

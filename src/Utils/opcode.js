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
    ServerResEnterGameServerConnection: "0x0314",
    ServerResEnterProloge: "0x0315", //0x0314? 0x0315?
    ClientReqWorldServerConnection: "0x0321",
    ServerResWorldServerConnection: "0x0322",
  },
  character: {
    ClientReqCharacterList: "0x0311",
    ServerResCharacterList: "0x0312",
    ClientReqCreateCharacter: "0x0301",
    ClientReqRemoveCharacter: "0x0302",
    ClientCharacterSelect: "0x0371",
    //ClientReqCharacterSlotChangeView: "0x0313",
    //ServerResCharacterSlotChangeView: "0x0313",
    ClientReqCharacterSlotChange: "0x0306",
    ServerResCharacterSlotChange: "0x0107", //?? 이거 잘 모르겠네 0x0318일수도?
    ClientReqCharacterSelect: "0x0347",
    ClientReqCharacterInfo: "0x0331",
    ServerResCharacterInfo: "0x0332",
  },
  game: {
    ServerResGuildInfo: "0x3407", //로딩중에 발견
    ServerResBattlePassLoad: "0x2A30",
    ServerResEventBooster: "0x2A20",
    ServerResAddEventBooster: "0x2902",
    ServerResEnterGameServer: "0x0322",
    ServerResSkipCutscene: "0x0319", //e2a379c70070726f6c6f6775655f72656d61696e7061726b5f31000087a1367b0100000001000000502550634046a5360200000030255063b083367b30c55e362046a5364046a536d0e98f0046f0367b0000000001000000502550630200000000000000905f553601000000e4e98f002f74357be0e98f00905f553670ea8f000000000090ea8f0083c43f7b5809547b905f553654eb8f0070ea8f0000000000c4ea8f0000000000905f55367c1a506300e08dc5de0000006cea8f001cedf9414cea8f000289217b10406165de0000001cedf94104e2ae1d4cea8f00f589217bf0476165e200000010e2ae1d88ea8f00e2ad1a7b1cedf941f04761650040610100406165f0
  },
  event: {
    ServerResAttendancePlayTimeLoad: "0x2A01",
    ServerResAttendancePlayTimeInit: "0x2A05",
  },
  world: {},
  misc: {
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

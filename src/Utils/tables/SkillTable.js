const Table = require("./Table");
const { SmartBuffer } = require("smart-buffer");

class SkillTable extends Table {
  loadData() {
    try {
      /*this.id = this.buf.readUInt32LE();
      this.one = this.buf.readInt16LE();
      this.unk1 = this.buf.readBigInt64LE();
      this.unk2 = this.buf.readInt8();
      this.unk3 = this.buf.readInt8();
      this.unk4 = this.buf.readBigInt64LE();
      this.unk5 = this.buf.readBigInt64LE();
      this.unk6 = this.buf.readBigInt64LE();
      this.unk7 = this.buf.readBigInt64LE();
      this.unk8 = this.buf.readInt16LE();
      this.unk9 = this.buf.readInt32LE();
      this.unk10 = this.buf.readInt16LE();
      this.unk11 = this.buf.readInt32LE();
      this.unk12 = this.buf.readInt32LE();
      this.unk13 = this.buf.readBigInt64LE();
      this.unk14 = this.buf.readBigInt64LE();
      this.unk15 = this.buf.readBigInt64LE();
      this.unk16 = this.buf.readBigInt64LE();
      this.unk17 = this.buf.readInt32LE();
      this.unk18 = this.buf.readInt16LE();
      this.unk19 = this.buf.readInt32LE();
      this.unk20 = this.buf.readInt8();
      this.unk21 = this.buf.readBigInt64LE();
      this.unk22 = this.buf.readInt32LE();
      this.unk23 = this.buf.readInt32LE();
      this.unk24 = this.buf.readInt8();
      this.unk25 = this.buf.readInt16LE();
      this.unk26 = this.buf.readInt16LE();
      this.unk27 = this.buf.readInt16LE();

      return this;*/

      /*  console.log(this.buf.readOffset);
      this.skillType = this.buf.readInt32LE();
      this.unk1 = this.buf.readInt32LE();
      this.unk2 = this.buf.readInt16LE();
      this.unk3 = this.buf.readInt32LE();
      this.unk4 = this.buf.readInt8(); //01
      this.unk5 = this.buf.readInt8(); //00 & 01
      this.unk6 = this.buf.readBigInt64LE();
      this.unk7 = this.buf.readBigInt64LE();
      this.unk8 = this.buf.readBigInt64LE();
      this.unk9 = this.buf.readInt16LE();
      this.unk10 = this.buf.readInt16LE();
      this.unk11 = this.buf.readBigInt64LE();
      this.unk12 = this.buf.readInt16LE();
      this.unk13 = this.buf.readInt8(); //자릿수 맞추기
      this.unk14 = this.buf.readInt16LE();
      this.unk15 = this.buf.readInt16LE();
      this.unk16 = this.buf.readBigInt64LE();
      this.unk17 = this.buf.readInt8();
      this.unk18 = this.buf.readInt32LE();
      this.unk19 = this.buf.readInt32LE();*/

      /* this.Uint32_1 = this.buf.readUInt32LE();
      this.Uint16_1 = this.buf.readUInt16LE();
      this.Uint32_2 = this.buf.readUInt32LE();
      this.Uint32_3 = this.buf.readUInt32LE();
      this.Uint8_1 = this.buf.readUInt8();
      this.Uint8_2 = this.buf.readUInt8();
      this.Uint8_3 = this.buf.readUInt8();
      this.Uint8_4 = this.buf.readUInt8();
      this.Uint8_5 = this.buf.readUInt8();
      this.Uint8_6 = this.buf.readUInt8();
      this.Uint8_7 = this.buf.readUInt8();
      this.Uint8_8 = this.buf.readUInt8();
      this.Uint32_4 = this.buf.readUInt32LE();
      this.Uint32_5 = this.buf.readUInt32LE();
      this.Uint32_6 = this.buf.readUInt32LE();
      this.Uint32_7 = this.buf.readUInt32LE();
      this.Uint32_8 = this.buf.readUInt32LE();
      this.Uint8_9 = this.buf.readUInt8();
      this.Uint8_10 = this.buf.readUInt8();
      this.Uint8_11 = this.buf.readUInt8();
      this.Uint8_12 = this.buf.readUInt8();
      this.Uint16_2 = this.buf.readUInt16LE();
      this.Float32_1 = this.buf.readFloatLE();
      this.Float32_2 = this.buf.readFloatLE();
      this.Float32_3 = this.buf.readFloatLE();
      this.Float32_4 = this.buf.readFloatLE();
      this.Float32_5 = this.buf.readFloatLE();
      this.Uint8_13 = this.buf.readUInt8();
      this.Uint16_3 = this.buf.readUInt16LE();
      this.Uint8_14 = this.buf.readUInt8();
      this.Uint8_15 = this.buf.readUInt8();
      this.Uint8_16 = this.buf.readUInt8();
      this.Uint32_9 = this.buf.readUInt32LE();
      this.Uint8_17 = this.buf.readUInt8();
      this.Uint8_18 = this.buf.readUInt8();
      this.Uint8_19 = this.buf.readUInt8();
      this.Uint8_20 = this.buf.readUInt8();
      this.Uint8_21 = this.buf.readUInt8();
      this.Uint32_10 = this.buf.readUInt32LE();
      this.Uint32_11 = this.buf.readUInt32LE();
      this.Uint32_12 = this.buf.readUInt32LE();
      this.Uint32_13 = this.buf.readUInt32LE();
      this.Uint32_14 = this.buf.readUInt32LE();
      this.Uint32_15 = this.buf.readUInt32LE();
      this.Uint32_16 = this.buf.readUInt32LE();
      this.Uint8_22 = this.buf.readUInt8();
      this.Uint16_4 = this.buf.readUInt16LE();
      this.Uint16_5 = this.buf.readUInt16LE();
      this.Uint8_23 = this.buf.readUInt8();
      this.Uint8_24 = this.buf.readUInt8();
      this.Uint8_25 = this.buf.readUInt8();
      this.Uint8_26 = this.buf.readUInt8();
      this.Uint8_27 = this.buf.readUInt8();
      this.Uint32_17 = this.buf.readUInt32LE();
      this.Uint8_28 = this.buf.readUInt8();
      this.Uint32_18 = this.buf.readUInt32LE();
      this.Uint32_19 = this.buf.readUInt32LE();
      this.Uint8_29 = this.buf.readUInt8();
      this.Uint16_6 = this.buf.readUInt16LE();
      this.len1 = this.buf.readUInt16LE();
      this.str1 = this.buf.readString(this.len1 * 2, "utf16le");
      this.Uint16_7 = this.buf.readUInt16LE();
      this.Uint32_20 = this.buf.readUInt32LE();
      this.Uint8_30 = this.buf.readUInt8();
      this.len2 = this.buf.readUInt16LE();
      this.str2 = this.buf.readString(this.len2 * 2, "utf16le");
      this.len3 = this.buf.readUInt16LE();
      this.str3 = this.buf.readString(this.len3 * 2, "utf16le");
      this.len4 = this.buf.readUInt16LE();
      this.str4 = this.buf.readString(this.len4 * 2, "utf16le");
      this.len5 = this.buf.readUInt16LE();
      this.str5 = this.buf.readString(this.len5 * 2, "utf16le");
      this.Uint8_31 = this.buf.readUInt8();
      this.Uint32_21 = this.buf.readUInt32LE();
      this.Uint16_8 = this.buf.readUInt16LE();
      this.Uint8_32 = this.buf.readUInt8();
      this.Uint8_33 = this.buf.readUInt8();
      this.Uint16_9 = this.buf.readUInt16LE();
      this.len6 = this.buf.readUInt16LE();
      this.str6 = this.buf.readString(this.len6 * 2, "utf16le");
      this.len7 = this.buf.readUInt16LE();
      this.str7 = this.buf.readString(this.len7 * 2, "utf16le");
      this.len8 = this.buf.readUInt16LE();
      this.str8 = this.buf.readString(this.len8 * 2, "utf16le");
      this.Uint8_34 = this.buf.readUInt8();
      this.len9 = this.buf.readUInt16LE();
      this.str9 = this.buf.readString(this.len9 * 2, "utf16le");
      this.len10 = this.buf.readUInt16LE();
      this.str10 = this.buf.readString(this.len10 * 2, "utf16le");
      this.Uint8_35 = this.buf.readUInt8();
      this.Uint8_36 = this.buf.readUInt8();
      this.Uint8_37 = this.buf.readUInt8();
      this.Uint8_38 = this.buf.readUInt8();
      this.Uint8_39 = this.buf.readUInt8();
      this.Uint8_40 = this.buf.readUInt8();*/

      this.i1 = this.buf.readUInt32LE();
      this.i2 = this.buf.readUInt16LE();
      this.i3 = this.buf.readUInt32LE();
      this.i4 = this.buf.readUInt32LE();
      this.i5 = this.buf.readUInt8();
      this.i6 = this.buf.readUInt8();
      this.i7 = this.buf.readUInt8();
      this.i8 = this.buf.readUInt8();
      this.i9 = this.buf.readUInt8();
      this.i10 = this.buf.readUInt8();
      this.i11 = this.buf.readUInt8();
      this.i12 = this.buf.readUInt8();
      this.i13 = this.buf.readUInt32LE();
      this.i14 = this.buf.readUInt32LE();
      this.i15 = this.buf.readUInt32LE();
      this.i16 = this.buf.readUInt32LE();
      this.i17 = this.buf.readUInt32LE();
      this.i18 = this.buf.readUInt8();
      this.i19 = this.buf.readUInt8();
      this.i20 = this.buf.readUInt8();
      this.i21 = this.buf.readUInt8();
      this.i22 = this.buf.readUInt16LE();
      this.float1 = this.buf.readFloatLE();
      this.float2 = this.buf.readFloatLE();
      this.float3 = this.buf.readFloatLE();
      this.float4 = this.buf.readFloatLE();
      this.float5 = this.buf.readFloatLE();
      this.i23 = this.buf.readUInt8();
      this.i24 = this.buf.readUInt16LE();
      this.i25 = this.buf.readUInt8();
      this.i26 = this.buf.readUInt8();
      this.i27 = this.buf.readUInt8();
      this.i28 = this.buf.readUInt32LE();
      this.i29 = this.buf.readUInt8();
      this.i30 = this.buf.readUInt8();
      this.i31 = this.buf.readUInt8();
      this.i32 = this.buf.readUInt8();
      this.i33 = this.buf.readUInt8();
      this.i34 = this.buf.readUInt32LE();
      this.i35 = this.buf.readUInt32LE();
      this.i36 = this.buf.readUInt32LE();
      this.i37 = this.buf.readUInt32LE();
      this.i38 = this.buf.readUInt32LE();
      this.i39 = this.buf.readUInt32LE();
      this.i40 = this.buf.readUInt32LE();
      this.i41 = this.buf.readUInt8();
      this.i42 = this.buf.readUInt16LE();
      this.i43 = this.buf.readUInt16LE();
      this.i44 = this.buf.readUInt8();
      this.i45 = this.buf.readUInt8();
      this.i46 = this.buf.readUInt8();
      this.i47 = this.buf.readUInt8();
      this.i48 = this.buf.readUInt8();
      this.i49 = this.buf.readUInt32LE();
      this.i50 = this.buf.readUInt8();
      this.i51 = this.buf.readUInt32LE();
      this.i52 = this.buf.readUInt32LE();
      this.i53 = this.buf.readUInt8();
      this.i54 = this.buf.readUInt16LE();
      this.i55 = this.buf.readUInt8();
      this.str1 = this.readString(this.buf);
      this.i56 = this.buf.readUInt16LE();
      this.i57 = this.buf.readUInt32LE();
      this.i58 = this.buf.readUInt8();
      this.str2 = this.readString(this.buf);
      this.str3 = this.readString(this.buf);
      this.str4 = this.readString(this.buf);
      this.str5 = this.readString(this.buf);
      this.i59 = this.buf.readUInt8();
      this.i60 = this.buf.readUInt32LE();
      this.i61 = this.buf.readUInt16LE();
      this.i62 = this.buf.readUInt8();
      this.i63 = this.buf.readUInt8();
      this.i64 = this.buf.readUInt16LE();
      this.str6 = this.readString(this.buf);
      this.str7 = this.readString(this.buf);
      this.str8 = this.readString(this.buf);
      this.i65 = this.buf.readUInt8();
      this.str9 = this.readString(this.buf);
      this.str10 = this.readString(this.buf);
      this.i66 = this.buf.readUInt8();
      this.i67 = this.buf.readUInt8();
      this.i68 = this.buf.readUInt8();
      this.i69 = this.buf.readUInt8();
      this.i70 = this.buf.readUInt8();
      this.i71 = this.buf.readUInt8();

      return this;
    } catch (err) {
      console.error(err);
      console.log(this);
    }
  }

  /**
   *
   * @param {SmartBuffer} buf
   */
  readString(buf) {
    const len = buf.readUInt8() * 2;

    return buf.readString(len, "utf16le");
  }
}

module.exports = SkillTable;

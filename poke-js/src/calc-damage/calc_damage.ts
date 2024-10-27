import {
  DEFENCE_ITEM_ID_ASSAULT_VEST,
  DEFENCE_ITEM_ID_SINKANOKISEKI,
} from "../defence-pokemon/DefenceItem";
import {
  Move,
  MOVE_DAMAGE_CLASS_PHYSICAL,
  MOVE_DAMAGE_CLASS_SPECIAL,
} from "../move";
import {
  OFFENCE_ITEM_ID_PUNCHGLOVE,
  OFFENCE_ITEM_ID_TIKARANOHATIMAKI,
  OFFENCE_ITEM_ID_MONOSHIRIMEGANE,
  OFFENCE_ITEM_ID_NORMAL_JEWEL,
  OFFENCE_ITEM_ID_KODAWARIHATIMAKI,
  OFFENCE_ITEM_ID_KODAWARIMEGANE,
  OFFENCE_ITEM_ID_INOTINOTAMA,
} from "../offence-pokemon/OffenceItem";
import { WEATHER_HARE, WEATHER_AME } from "../other_setting";
import { otherSetting } from "../OtherSetting";
import {
  PokemonDefenceInterface,
  PokemonOffenceInterface,
  rankCorrectionEnum,
} from "../pokemon";
import {
  calcRealValueHPStat,
  calcRealValueAttackDefencePokemon,
  calcRealValueDeffenceDefencePokemon,
  calcRealValueSpecialAttackDefencePokemon,
  calcRealValueSpecialDeffenceDefencePokemon,
  calcRealValueAttackOffencePokemon,
  calcRealValueDeffenceOffencePokemon,
  calcRealValueSpecialAttackOffencePokemon,
  calcRealValueSpecialDeffenceOffencePokemon,
} from "../stat_calc";
import {
  POKEMON_TYPE_NORMAL,
  POKEMON_TYPE_FLYING,
  POKEMON_TYPE_ELECTRIC,
  POKEMON_TYPE_ICE,
  POKEMON_TYPE_ROCK,
  POKEMON_TYPE_GROUND,
  POKEMON_TYPE_STEEL,
  POKEMON_TYPE_GRASS,
  POKEMON_TYPE_FIRE,
  POKEMON_TYPE_WATER,
  POKEMON_TYPE_BUG,
  POKEMON_TYPE_DRAGON,
  POKEMON_TYPE_FAIRY,
} from "../type";
import type_map from "../type-map";
import { canScrappy } from "../util";
import { calc_move_power } from "./calc_move_power";

interface damageRateMapper {
  compatibilityRate: number; //攻撃技と防御側ポケモンの相性補正
  sameTypeRate: number; //タイプ一致の補正
  randRate: number; //乱数幅(0.85~1.00)
}
export type PersonalityRate = 0.9 | 1.0 | 1.1;
export interface Personality {
  attack: PersonalityRate;
  defense: PersonalityRate;
  special_attack: PersonalityRate;
  special_defense: PersonalityRate;
}
export interface EffectiveValue {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

function tatamikomi(dictList: { [name: number]: number }[]): {
  [name: number]: number;
} {
  if (dictList.length === 1) {
    return dictList[0];
  }
  const [m1, m2, newD] = [
    dictList.shift(),
    dictList.shift(),
    {} as { [name: number]: number },
  ];
  if (m1 && m2) {
    Object.keys(m1).forEach((k1) => {
      Object.keys(m2).forEach((k2) => {
        const [m1i, m2i] = [parseInt(k1), parseInt(k2)];
        if (!Object.hasOwn(newD, m1i + m2i)) {
          newD[m1i + m2i] = 0;
        }
        newD[m1i + m2i] += m1[m1i] * m2[m2i];
      });
    });
    dictList.unshift(newD);
    return tatamikomi(dictList);
  } else {
    return dictList[0];
  }
}

function listToMapper(numberList: number[]): { [name: number]: number }[] {
  const temp: { [name: number]: number } = {};
  numberList.forEach((w: number) => {
    if (!Object.hasOwn(temp, w)) {
      temp[w] = 0;
    }
    temp[w] += 1;
  });
  const retList: { [name: number]: number }[] = [temp];
  return retList;
}

export function copiedDummyInfoForDefencePokemon({
  deffencePokemon,
  deffenceDummyPokemon,
}: {
  deffencePokemon: PokemonDefenceInterface;
  deffenceDummyPokemon: PokemonDefenceInterface;
}): PokemonDefenceInterface {
  const newDefencePokemon = { ...deffencePokemon };
  newDefencePokemon.effective_slider_step =
    deffenceDummyPokemon.effective_slider_step;
  newDefencePokemon.personality = deffenceDummyPokemon.personality;
  newDefencePokemon.selected_defencete_item_rate_id =
    deffenceDummyPokemon.selected_defencete_item_rate_id;
  newDefencePokemon.effective_value = {
    hp: calcRealValueHPStat(newDefencePokemon),
    attack: calcRealValueAttackDefencePokemon(newDefencePokemon),
    defense: calcRealValueDeffenceDefencePokemon(newDefencePokemon),
    special_attack: calcRealValueSpecialAttackDefencePokemon(newDefencePokemon),
    special_defense:
      calcRealValueSpecialDeffenceDefencePokemon(newDefencePokemon),
  };
  newDefencePokemon.terasu_type = deffenceDummyPokemon.terasu_type;
  return newDefencePokemon;
}

export function calc_interface({
  offencePokemonList,
  deffencePokemon,
  deffenceDummyPokemon,
  otherSetting,
}: {
  offencePokemonList: PokemonOffenceInterface[];
  deffencePokemon: PokemonDefenceInterface;
  deffenceDummyPokemon: PokemonDefenceInterface;
  otherSetting: otherSetting;
}) {
  const copiedDefencePokemon = copiedDummyInfoForDefencePokemon({
    deffencePokemon,
    deffenceDummyPokemon,
  });
  const damageMapList: { [name: number]: number }[] = [];
  offencePokemonList.forEach((offencePokemon) => {
    offencePokemon.effective_value = {
      hp: calcRealValueHPStat(offencePokemon),
      attack: calcRealValueAttackOffencePokemon(offencePokemon),
      defense: calcRealValueDeffenceOffencePokemon(offencePokemon),
      special_attack: calcRealValueSpecialAttackOffencePokemon(offencePokemon),
      special_defense:
        calcRealValueSpecialDeffenceOffencePokemon(offencePokemon),
    };

    const move = offencePokemon.selected_move;
    if (move) {
      const rateMapper = {
        compatibilityRate: getCompatibilityTypeRate(
          offencePokemon,
          copiedDefencePokemon
        ),
        sameTypeRate: calcOffenceMoveTypeRate(move, offencePokemon),
        // multiscaleRate: 1 / 2,
      } as damageRateMapper;
      const hitNumber =
        move.is_renzoku && offencePokemon.selected_hit_number
          ? offencePokemon.selected_hit_number
          : 1;
      // もう少しいい鳥悪の処理方法(メモ化して同じなら同じ奴を返すほうが良いので)
      for (let loopHitNumber = 1; loopHitNumber <= hitNumber; loopHitNumber++) {
        const calcedList = calcWithRand(
          move,
          offencePokemon,
          copiedDefencePokemon,
          rateMapper,
          loopHitNumber,
          otherSetting
        );
        damageMapList.push(...listToMapper(calcedList));
      }
    }
  });
  const retTatamikomi = tatamikomi(damageMapList);
  return to_string_v2(copiedDefencePokemon, retTatamikomi);
}

function to_string_v2(
  deffencePokemon: PokemonDefenceInterface,
  retTatamikomi: {
    [name: number]: number;
  }
): string {
  const damageList = Object.keys(retTatamikomi).map((v) => parseInt(v));
  const maxDamage = Math.max(...damageList);
  const minDamage = Math.min(...damageList);
  if (minDamage === 0 || maxDamage === 0) return "";
  const headInfo = calc_kakutei_ransuu(
    deffencePokemon.effective_value.hp,
    minDamage,
    maxDamage,
    1
  );
  let retstr = `${headInfo.s}${headInfo.n}発【${minDamage}~${maxDamage}】`;
  if (headInfo.s === "乱数") {
    const rate = calcRate(deffencePokemon.effective_value.hp, retTatamikomi);
    retstr += `(${rate}%)`;
  }
  return retstr;
  // return head+tail
}

function calc_kakutei_ransuu(
  hp: number,
  minDamage: number,
  maxDamage: number,
  n: number
): { s: string; n: number } {
  if (n * minDamage >= hp) {
    return { s: "確定", n: n };
  } else if (n * minDamage < hp && n * maxDamage >= hp) {
    return { s: "乱数", n: n };
  }
  return calc_kakutei_ransuu(hp, minDamage, maxDamage, n + 1);
}

function calcRate(
  hp: number,
  retTatamikomi: {
    [name: number]: number;
  }
) {
  const sumPatternNumber = Object.values(retTatamikomi).reduce(function (s, e) {
    return s + e;
  });
  const okPattern = Object.keys(retTatamikomi).filter((d) => parseInt(d) >= hp);
  let okPatternNumber = 0;
  Object.keys(retTatamikomi).forEach((d) => {
    if (okPattern.includes(d)) {
      okPatternNumber += retTatamikomi[parseInt(d)];
    }
  });

  const rate = okPatternNumber / sumPatternNumber;
  // parseFloat(rate.toFixed(3))
  // return rate * 100;

  return parseFloat(rate.toFixed(rate * 100));
}

function calcWithRand(
  move: Move,
  offencePokemon: PokemonOffenceInterface,
  deffencePokemon: PokemonDefenceInterface,
  rateMapper: damageRateMapper,
  loopHitNumber: number,
  otherSetting: otherSetting
): Array<number> {
  const retList = [] as Array<number>;
  for (let rand = 0.85; rand <= 1.0; rand += 0.01) {
    rateMapper.randRate = rand;
    const base = calc({
      move,
      offencePokemon,
      deffencePokemon,
      rateMapper,
      loopHitNumber,
      otherSetting,
    });
    retList.push(base);
  }
  return retList;
}

export const per_110 = 4505 / 4096;
export const per_110_punchglobe = 4506 / 4096;
export const per_150 = 6144 / 4096;
export const per_200 = 8192 / 4096;
export const per_225 = 9216 / 4096;
export const per_050 = 2048 / 4096;
export const per_075 = 3072 / 4096;
export const per_130 = 5324 / 4096;
export const per_130_normal_jewel_field = 5325 / 4096;
export const per_120 = 4915 / 4096;
export const per_100 = 4096 / 4096;

function calc_attack({
  move,
  offencePokemon,
  deffencePokemon,
  rateMapper,
  loopHitNumber,
}: {
  move: Move;
  offencePokemon: PokemonOffenceInterface;
  deffencePokemon: PokemonDefenceInterface;
  rateMapper: damageRateMapper;
  loopHitNumber: number;
}) {
  let attack =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? offencePokemon.effective_value.attack
      : offencePokemon.effective_value.special_attack;

  let localRate = 4096;

  // とくせい
  if (
    offencePokemon.selected_ability?.is_sinryoku &&
    move.type === POKEMON_TYPE_GRASS
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_mouka &&
    move.type === POKEMON_TYPE_FIRE
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_gekiryu &&
    move.type === POKEMON_TYPE_WATER
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_suihou &&
    move.damage_class_number === POKEMON_TYPE_WATER
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_musinosirase &&
    move.type === POKEMON_TYPE_BUG
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_ryunoagito &&
    move.type === POKEMON_TYPE_DRAGON
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_iwahakobi &&
    move.type === POKEMON_TYPE_ROCK
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_haganetukai &&
    move.type === POKEMON_TYPE_STEEL
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_gorimutixyuu &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_tikaramoti &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
  ) {
    localRate = Math.floor(localRate * per_150);
  }

  // アイテム
  if (
    offencePokemon.selected_offencete_item_rate_id ===
      OFFENCE_ITEM_ID_KODAWARIHATIMAKI &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
  ) {
    localRate = Math.floor(localRate * per_150);
  } else if (
    offencePokemon.selected_offencete_item_rate_id ===
      OFFENCE_ITEM_ID_KODAWARIMEGANE &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL
  ) {
    localRate = Math.floor(localRate * per_150);
  }

  let finalAttack = calc_五捨五超入_gosutegoire((attack * localRate) / 4096);
  if (finalAttack < 1) {
    finalAttack = 1;
  }

  return finalAttack;
}

function calc_defence({
  move,
  offencePokemon,
  deffencePokemon,
  rateMapper,
  loopHitNumber,
}: {
  move: Move;
  offencePokemon: PokemonOffenceInterface;
  deffencePokemon: PokemonDefenceInterface;
  rateMapper: damageRateMapper;
  loopHitNumber: number;
}) {
  // 【5】防御の補正値
  let defense =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? deffencePokemon.effective_value.defense
      : deffencePokemon.effective_value.special_defense;

  let localRate = 4096;
  // 特性
  if (
    offencePokemon.selected_ability?.is_wazawainoturugi &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
  ) {
    localRate = Math.round(localRate * per_075);
  } else if (
    offencePokemon.selected_ability?.is_wazawainoutama &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL
  ) {
    localRate = Math.round(localRate * per_075);
  }

  if (
    move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL &&
    deffencePokemon.selected_defencete_item_rate_id ===
      DEFENCE_ITEM_ID_ASSAULT_VEST
  ) {
    localRate = Math.round(localRate * per_150);
  } else if (
    deffencePokemon.selected_defencete_item_rate_id ===
      DEFENCE_ITEM_ID_SINKANOKISEKI &&
    deffencePokemon.pokemon.is_not_last_evolve
  ) {
    localRate = Math.round(localRate * per_150);
  }

  let finalDefence = calc_五捨五超入_gosutegoire((defense * localRate) / 4096);
  if (finalDefence < 1) {
    finalDefence = 1;
  }

  return finalDefence;
}

function calc_damage_rate({
  move,
  offencePokemon,
  deffencePokemon,
  rateMapper,
  loopHitNumber,
}: {
  move: Move;
  offencePokemon: PokemonOffenceInterface;
  deffencePokemon: PokemonDefenceInterface;
  rateMapper: damageRateMapper;
  loopHitNumber: number;
}) {
  let localRate = 4096;
  if (
    offencePokemon.selected_offencete_item_rate_id ===
    OFFENCE_ITEM_ID_INOTINOTAMA
  ) {
    localRate = Math.round(localRate * per_130);
  }
  return localRate;
}

function calc({
  move,
  offencePokemon,
  deffencePokemon,
  rateMapper,
  loopHitNumber,
  otherSetting,
}: {
  move: Move;
  offencePokemon: PokemonOffenceInterface;
  deffencePokemon: PokemonDefenceInterface;
  rateMapper: damageRateMapper;
  loopHitNumber: number;
  otherSetting: otherSetting;
}) {
  // 【1】威力の補正値
  const power = calc_move_power({
    move,
    offencePokemon,
    deffencePokemon,
    // rateMapper,
    loopHitNumber,
    otherSetting,
  });

  // 【3】攻撃の補正値
  const attack = calc_attack({
    deffencePokemon,
    loopHitNumber,
    move,
    offencePokemon,
    rateMapper,
  });
  const defence = calc_defence({
    deffencePokemon,
    loopHitNumber,
    move,
    offencePokemon,
    rateMapper,
  });

  // 【7】ダメージの補正値
  const damageRateCalced = calc_damage_rate({
    deffencePokemon,
    loopHitNumber,
    move,
    offencePokemon,
    rateMapper,
  });
  // 【8】最終ダメージ

  // 基本ダメージ部分計算
  let a = Math.floor((50 * 2) / 5 + 2);
  a = Math.floor((a * power * attack) / defence);
  a = Math.floor(a / 50 + 2);

  // 順番を守って各種倍率を掛け算していく

  // 天気
  if (otherSetting.weather === WEATHER_HARE) {
    if (offencePokemon.selected_move?.type === POKEMON_TYPE_FIRE) {
      a = calc_五捨五超入_gosutegoire(a * per_150);
    } else if (offencePokemon.selected_move?.type === POKEMON_TYPE_WATER) {
      a = calc_五捨五超入_gosutegoire(a * per_050);
    }
  }
  if (otherSetting.weather === WEATHER_AME) {
    if (offencePokemon.selected_move?.type === POKEMON_TYPE_FIRE) {
      a = calc_五捨五超入_gosutegoire(a * per_050);
    } else if (offencePokemon.selected_move?.type === POKEMON_TYPE_WATER) {
      a = calc_五捨五超入_gosutegoire(a * per_150);
    }
  }

  // 乱数
  a = Math.floor(a * rateMapper.randRate);

  // タイプ一致補正
  a = calc_五捨五超入_gosutegoire(a * rateMapper.sameTypeRate);

  // タイプ相性
  a = Math.floor(a * rateMapper.compatibilityRate);

  // 7番の補正
  a = calc_五捨五超入_gosutegoire((a * damageRateCalced) / 4096);

  return a;
}
/**
 *
 * @param a 五捨五超入したい数値
 * @returns 五捨五超入された値
 */
export function calc_五捨五超入_gosutegoire(a: number): number {
  return Math.ceil(a - 0.5);
}

/**
 * タイプ相性での倍率計算をして倍率を返す(テラスタルもここで考慮)
 * @param offencePokemon
 * @param deffencePokemon
 * @returns ダメージ倍率
 */
function getCompatibilityTypeRate(
  offencePokemon: PokemonOffenceInterface,
  deffencePokemon: PokemonDefenceInterface
): number {
  let offenceType = offencePokemon.selected_move?.type || 1;
  if (
    offencePokemon.selected_ability?.is_faily_skin &&
    offencePokemon.selected_move?.type === POKEMON_TYPE_NORMAL
  ) {
    offenceType = POKEMON_TYPE_FAIRY;
  }
  if (
    offencePokemon.selected_ability?.is_faily_skin &&
    offencePokemon.selected_move?.type === POKEMON_TYPE_NORMAL
  ) {
    offenceType = POKEMON_TYPE_FAIRY;
  }
  if (
    offencePokemon.selected_ability?.is_faily_skin &&
    offencePokemon.selected_move?.type === POKEMON_TYPE_NORMAL
  ) {
    offenceType = POKEMON_TYPE_FAIRY;
  }
  if (
    offencePokemon.selected_ability?.is_faily_skin &&
    offencePokemon.selected_move?.type === POKEMON_TYPE_NORMAL
  ) {
    offenceType = POKEMON_TYPE_FAIRY;
  }
  // TODO : ノーマルスキン

  let deffenceTypeList = deffencePokemon.pokemon.type_id_list;
  // 防御側のテラスタイプによる調整
  if (deffencePokemon.terasu_type && deffencePokemon.terasu_type > 0) {
    deffenceTypeList = [deffencePokemon.terasu_type];
  }

  let res = 1.0;
  const deffenceType1 = deffenceTypeList[0];
  const r1 = type_map[deffenceType1].damage_relations;
  if (r1.double_damage_from.includes(offenceType)) {
    res *= per_200;
  } else if (r1.half_damage_from.includes(offenceType)) {
    res *= per_050;
  } else if (r1.no_damage_from.includes(offenceType)) {
    if (!canScrappy(offencePokemon)) {
      res *= 0;
    }
  }
  if (deffenceTypeList.length === 2) {
    const deffenceType2 = deffenceTypeList[1];
    const r2 = type_map[deffenceType2].damage_relations;
    if (r2.double_damage_from.includes(offenceType)) {
      res *= per_200;
    } else if (r2.half_damage_from.includes(offenceType)) {
      res *= per_050;
    } else if (r2.no_damage_from.includes(offenceType)) {
      if (!canScrappy(offencePokemon)) {
        res *= 0;
      }
    }
  }
  return res;
}

/**
 * 攻める側のタイプ相性による倍率計算
 * @param move
 * @param offencePokemon
 * @returns
 */
function calcOffenceMoveTypeRate(
  move: Move,
  offencePokemon: PokemonOffenceInterface
): number {
  let moveType = move.type;

  if (
    offencePokemon.selected_ability?.is_faily_skin &&
    move?.type === POKEMON_TYPE_NORMAL
  ) {
    moveType = POKEMON_TYPE_FAIRY;
  } else if (
    offencePokemon.selected_ability?.is_sky_skin &&
    move?.type === POKEMON_TYPE_NORMAL
  ) {
    moveType = POKEMON_TYPE_FLYING;
  } else if (
    offencePokemon.selected_ability?.is_ereki_skin &&
    move?.type === POKEMON_TYPE_NORMAL
  ) {
    moveType = POKEMON_TYPE_ELECTRIC;
  } else if (
    offencePokemon.selected_ability?.is_freeze_skin &&
    move?.type === POKEMON_TYPE_NORMAL
  ) {
    moveType = POKEMON_TYPE_ICE;
  }

  if (offencePokemon.terasu_type) {
    if (moveType === offencePokemon.terasu_type) {
      if (offencePokemon.pokemon.type_id_list.includes(moveType)) {
        return per_225;
      }
      return per_200;
    }
    return per_150;
  }

  if (offencePokemon.pokemon.type_id_list.includes(moveType)) {
    if (offencePokemon.selected_ability?.is_tekiourixyoku) {
      return per_200;
    }
    return per_150;
  }
  return per_100;

  /*
  if (offencePokemon.terasu_type) {
    if (
      offencePokemon.terasu_type === moveType &&
      offencePokemon.selected_ability?.is_tekiourixyoku &&
      offencePokemon.pokemon.type_id_list.includes(moveType)
    ) {
      return per_225;
    } else if (
      offencePokemon.terasu_type === moveType &&
      offencePokemon.pokemon.type_id_list.includes(moveType)
    ) {
      return per_200;
    } else if (
      offencePokemon.terasu_type === moveType &&
      !offencePokemon.pokemon.type_id_list.includes(moveType)
    ) {
      return per_150;
    } else if (
      offencePokemon.terasu_type === POKEMON_TYPE_STERA &&
      offencePokemon.pokemon.type_id_list.includes(moveType)
    ) {
      return per_200;
    } else if (
      offencePokemon.terasu_type === POKEMON_TYPE_STERA &&
      !offencePokemon.pokemon.type_id_list.includes(moveType)
    ) {
      return per_120;
    }
  }
  if (
    offencePokemon.pokemon.type_id_list.includes(moveType) &&
    offencePokemon.selected_ability?.is_tekiourixyoku
  ) {
    return per_200;
  }
  if (offencePokemon.pokemon.type_id_list.includes(moveType)) {
    return per_150;
  }
  return per_100;
  */
}

function calcRankedValue(baseValue: number, rate: rankCorrectionEnum): number {
  let wwww = 2 / 2;
  if (rate > 0) {
    wwww = (2 + rate) / 2;
  } else if (rate < 0) {
    wwww = 2 / (2 + Math.abs(rate));
  }

  return Math.floor(baseValue * wwww);
}

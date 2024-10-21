import {
  DEFENCE_ITEM_ID_ASSAULT_VEST,
  DEFENCE_ITEM_ID_SINKANOKISEKI,
} from "./DefenceItem";
import {
  Move,
  MOVE_DAMAGE_CLASS_PHYSICAL,
  MOVE_DAMAGE_CLASS_SPECIAL,
} from "./move";
import { OFFENCE_ITEM_ID_INOTINOTAMA, OFFENCE_ITEM_ID_KODAWARIHATIMAKI, OFFENCE_ITEM_ID_KODAWARIMEGANE, OFFENCE_ITEM_ID_MONOSHIRIMEGANE, OFFENCE_ITEM_ID_PUNCHGLOVE, OFFENCE_ITEM_ID_TIKARANOHATIMAKI } from "./OffenceItem";
import OffencePokemon from "./OffencePokemon";
import {
  PokemonDefenceInterface,
  PokemonOffenceInterface,
  rankCorrectionEnum,
} from "./pokemon";
import {
  calcRealValueHPStat,
  calcRealValueAttackDefencePokemon,
  calcRealValueSpecialAttackDefencePokemon,
  calcRealValueDeffenceDefencePokemon,
  calcRealValueSpecialDeffenceDefencePokemon,
  calcRealValueAttackOffencePokemon,
  calcRealValueDeffenceOffencePokemon,
  calcRealValueSpecialAttackOffencePokemon,
  calcRealValueSpecialDeffenceOffencePokemon,
} from "./stat_calc";
import type_map from "./type-map";
import { canScrappy } from "./util";

interface damageRateMapper {
  compatibilityRate: number; //攻撃技と防御側ポケモンの相性補正
  sameTypeRate: number; //タイプ一致の補正
  randRate: number; //乱数幅(0.85~1.00)
  // multiscaleRate: number;
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
}: {
  offencePokemonList: PokemonOffenceInterface[];
  deffencePokemon: PokemonDefenceInterface;
  deffenceDummyPokemon: PokemonDefenceInterface;
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
          loopHitNumber
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
  loopHitNumber: number
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
    });
    retList.push(base);
  }
  return retList;
}

const per_110=4505/4096
const per_110_punchglobe=4506/4096
const per_150=6144/4096
const per_130=5324/4096
const per_120=4915/4096

function calc_move_power({
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
}){
  let power = move.power;
  // トリプルアクセル/トリプルキックの時、Hit回数によって威力が変わる
  if (move.id === 813 || move.id === 167) {
    power = power * loopHitNumber;
  }
  if (move.is_ketaguri) {
    power = calcPowerKetaguri(deffencePokemon);
  }

  if (move.is_punch){
    if(offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_PUNCHGLOVE){
      power=Math.floor(power*per_110_punchglobe)

    }
    if(offencePokemon.selected_ability_id===89){
      power=Math.floor(power*per_120)

    }
  }
  if (move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL&&offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_TIKARANOHATIMAKI){
    power=Math.floor(power*per_110)
  }
  if (move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL&&offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_MONOSHIRIMEGANE){
    power=Math.floor(power*per_110)
  }
return power
}

function calc({
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

  /*
  let power = move.power;
  // トリプルアクセル/トリプルキックの時、Hit回数によって威力が変わる
  if (move.id === 813 || move.id === 167) {
    power = power * loopHitNumber;
  }
  if (move.is_ketaguri) {
    power = calcPowerKetaguri(deffencePokemon);
  }

  if (move.is_punch&&offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_PUNCHGLOVE){
    power=Math.floor(power*per_110_punchglobe)
  }
  if (move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL&&offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_TIKARANOHATIMAKI){
    power=Math.floor(power*per_110)
  }
  if (move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL&&offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_MONOSHIRIMEGANE){
    power=Math.floor(power*per_110)
  }
  */
 const power=calc_move_power({
  move,
  offencePokemon,
  deffencePokemon,
  rateMapper,
  loopHitNumber,
})

  let attack =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? offencePokemon.effective_value.attack
      : offencePokemon.effective_value.special_attack;
  if (move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL) {
    if (offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_KODAWARIHATIMAKI){
      attack = Math.floor(attack*per_150)
    }
    attack = calcRankedValue(attack, offencePokemon.rankCorrection.attack);
  } else if (move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL) {
    if (offencePokemon.selected_offencete_item_rate_id===OFFENCE_ITEM_ID_KODAWARIMEGANE){
      attack = Math.floor(attack*per_150)
    }
    attack = calcRankedValue(
      attack,
      offencePokemon.rankCorrection.special_attack
    );
  }

  let defense =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? deffencePokemon.effective_value.defense
      : deffencePokemon.effective_value.special_defense;

  // とつげきチョッキ
  if (
    move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL &&
    deffencePokemon.selected_defencete_item_rate_id ===
      DEFENCE_ITEM_ID_ASSAULT_VEST
  ) {
    // defense = Math.round((defense * 6144) / 4096);
    defense = Math.round(defense*per_150);
  }

  // しんかのきせき
  if (
    deffencePokemon.selected_defencete_item_rate_id ===
      DEFENCE_ITEM_ID_SINKANOKISEKI &&
    deffencePokemon.pokemon.is_not_last_evolve
  ) {
    // defense = Math.round((defense * 6144) / 4096);
    defense = Math.round(defense*per_150);
  }

  // 基本ダメージ部分計算
  let a = Math.floor((50 * 2) / 5 + 2);
  a = Math.floor((a * power * attack) / defense);
  a = Math.floor(a / 50 + 2);

  // // 順番を守って各種倍率を掛け算していく
  // if (canMultiscale(deffencePokemon)){
  // a = Math.floor(a * rateMapper.multiscaleRate);}
  a = Math.floor(a * rateMapper.randRate);
  a = calc_五捨五超入_gosutegoire(a * rateMapper.sameTypeRate);
  a = Math.floor(a * rateMapper.compatibilityRate);

  if (
    offencePokemon.selected_offencete_item_rate_id ===
    OFFENCE_ITEM_ID_INOTINOTAMA
  ) {
    // a = calc_五捨五超入_gosutegoire((a * 5324) / 4096);
    a = calc_五捨五超入_gosutegoire(a*per_130);
  }

  return a;
}
/**
 *
 * @param a 五捨五超入したい数値
 * @returns 五捨五超入された値
 */
function calc_五捨五超入_gosutegoire(a: number): number {
  return Math.ceil(a - 0.5);
}

/**
 * けたぐり/くさむすびでの威力計算をする
 * @param deffencePokemon 体重計算するべき防御側のポケモン
 * @returns 威力
 */
function calcPowerKetaguri(deffencePokemon: PokemonDefenceInterface): number {
  const w = deffencePokemon.pokemon.weight;
  if (w < 100) {
    return 20;
  } else if (w < 250) {
    return 40;
  } else if (w < 500) {
    return 60;
  } else if (w < 1000) {
    return 80;
  } else if (w < 2000) {
    return 100;
  }
  return 120;
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
  const offenceType = offencePokemon.selected_move?.type || 1;
  let deffenceTypeList = deffencePokemon.pokemon.type_id_list;
  // 防御側のテラスタイプによる調整
  if (deffencePokemon.terasu_type && deffencePokemon.terasu_type > 0) {
    deffenceTypeList = [deffencePokemon.terasu_type];
  }

  let res = 1.0;
  const deffenceType1 = deffenceTypeList[0];
  const r1 = type_map[deffenceType1].damage_relations;
  if (r1.double_damage_from.includes(offenceType)) {
    res *= 2.0;
  } else if (r1.half_damage_from.includes(offenceType)) {
    res *= 0.5;
  } else if (r1.no_damage_from.includes(offenceType)) {
    if (!canScrappy(offencePokemon)) {
      res *= 0;
    }
  }
  if (deffenceTypeList.length === 2) {
    const deffenceType2 = deffenceTypeList[1];
    const r2 = type_map[deffenceType2].damage_relations;
    if (r2.double_damage_from.includes(offenceType)) {
      res *= 2.0;
    } else if (r2.half_damage_from.includes(offenceType)) {
      res *= 0.5;
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
  if (offencePokemon.terasu_type) {
    if (
      offencePokemon.terasu_type === move.type &&
      offencePokemon.pokemon.type_id_list.includes(move.type)
    ) {
      return 2.0;
    } else if (
      offencePokemon.terasu_type === move.type &&
      !offencePokemon.pokemon.type_id_list.includes(move.type)
    ) {
      return 1.5;
    } else if (
      offencePokemon.terasu_type === 19 &&
      offencePokemon.pokemon.type_id_list.includes(move.type)
    ) {
      return 2.0;
    } else if (
      offencePokemon.terasu_type === 19 &&
      !offencePokemon.pokemon.type_id_list.includes(move.type)
    ) {
      // return 4916 / 4096; // 1.2
      return per_120; // 1.2
    }
  }
  if (offencePokemon.pokemon.type_id_list.includes(move.type)) {
    return 1.5;
  }
  return 1.0;
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

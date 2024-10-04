import { Move, MOVE_DAMAGE_CLASS_PHYSICAL } from "./move";
import { ITEM_RATE_ID_INOTINOTAMA_13 } from "./OffenceItem";
import {
  Pokemon,
  PokemonDefenceInterface,
  PokemonOffenceInterface,
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
  compatibilityRate: number;
  sameTypeRate: number;
  randRate: number;
  multiscaleRate: number;
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

export function calc_interface({
  offencePokemonList,
  deffencePokemon,
  deffenceDummyPokemon,
}: {
  offencePokemonList: PokemonOffenceInterface[];
  deffencePokemon: PokemonDefenceInterface;
  deffenceDummyPokemon: PokemonDefenceInterface;
}) {
  const kusatuonsen = { ...deffencePokemon };
  kusatuonsen.effective_slider_step =
    deffenceDummyPokemon.effective_slider_step;
  kusatuonsen.personality = deffenceDummyPokemon.personality;

  kusatuonsen.effective_value = {
    hp: calcRealValueHPStat(kusatuonsen),
    attack: calcRealValueAttackDefencePokemon(kusatuonsen),
    defense: calcRealValueDeffenceDefencePokemon(kusatuonsen),
    special_attack: calcRealValueSpecialAttackDefencePokemon(kusatuonsen),
    special_defense: calcRealValueSpecialDeffenceDefencePokemon(kusatuonsen),
  };
  kusatuonsen.terasu_type = deffenceDummyPokemon.terasu_type;
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
          kusatuonsen
        ),
        sameTypeRate: calcOffenceMoveTypeRate(move, offencePokemon),
        multiscaleRate: 1 / 2,
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
          kusatuonsen,
          rateMapper,
          loopHitNumber
        );
        damageMapList.push(...listToMapper(calcedList));
      }
    }
  });
  const retTatamikomi = tatamikomi(damageMapList);
  // const damageList = Object.keys(retTatamikomi).map((v) => parseInt(v));
  // const maxDamage = Math.max(...damageList);
  // const minDamage = Math.min(...damageList);
  // if (minDamage >= deffencePokemon.effective_value.hp) {
  //   return `確定1発(${minDamage}~${maxDamage})`;
  // }
  // return `(${minDamage}~${maxDamage})`;
  return to_string_v2(kusatuonsen, retTatamikomi);
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
    console.log(rate)
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
) :{s:string,n:number} {
  // console.log(hp,minDamage,maxDamage)
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
  return rate * 100;
}

function to_string(
  deffencePokemon: PokemonDefenceInterface,
  retTatamikomi: {
    [name: number]: number;
  }
): string {
  const damageList = Object.keys(retTatamikomi).map((v) => parseInt(v));
  const maxDamage = Math.max(...damageList);
  const minDamage = Math.min(...damageList);
  let headString = "";
  if (minDamage >= deffencePokemon.effective_value.hp) {
    headString = "確定1発";
  } else if (
    minDamage < deffencePokemon.effective_value.hp &&
    maxDamage >= deffencePokemon.effective_value.hp
  ) {
    headString = "乱数1発";
    const sumPatternNumber = Object.values(retTatamikomi).reduce(function (
      s,
      e
    ) {
      return s + e;
    });
    const okPattern = Object.keys(retTatamikomi).filter(
      (d) => parseInt(d) >= deffencePokemon.effective_value.hp
    );
    let okPatternNumber = 0;
    Object.keys(retTatamikomi).forEach((d) => {
      if (okPattern.includes(d)) {
        okPatternNumber += retTatamikomi[parseInt(d)];
      }
    });

    const rate = okPatternNumber / sumPatternNumber;
    console.log(rate * 100);
    headString = `乱数${rate * 100}%1発`;
  }
  return `${headString}(${minDamage}~${maxDamage})`;
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
  let power = move.power;
  // トリプルアクセル/トリプルキックの時、Hit回数によって威力が変わる
  if (move.id === 813 || move.id === 167) {
    power = power * loopHitNumber;
  }
  if (move.is_ketaguri) {
    power = calcPowerKetaguri(deffencePokemon);
  }
  const attack =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? offencePokemon.effective_value.attack
      : offencePokemon.effective_value.special_attack;
  const defense =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? deffencePokemon.effective_value.defense
      : deffencePokemon.effective_value.special_defense;

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
    ITEM_RATE_ID_INOTINOTAMA_13
  ) {
    a = calc_五捨五超入_gosutegoire((a * 5324) / 4096);
  }

  return a;
}

function calc_五捨五超入_gosutegoire(a: number): number {
  return Math.ceil(a - 0.5);
}

/**
 * けたぐり/くさむすびでの威力計算をする
 * @param deffencePokemon
 * @returns
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
      return 4916 / 4096; // 1.2
    }
  }
  if (offencePokemon.pokemon.type_id_list.includes(move.type)) {
    return 1.5;
  }
  return 1.0;
}

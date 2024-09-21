import { Move, MOVE_DAMAGE_CLASS_PHYSICAL } from "./move";
import { Pokemon } from "./pokemon";
import type_map from "./type-map";
import {
  calcRealValueHPStat,
  calcRealValueOtherStat,
  // canMultiscale,
  canScrappy,
} from "./util";

interface damageRateMapper {
  compatibilityRate: number;
  sameTypeRate: number;
  randRate: number;
  multiscaleRate:number;
}
export type PersonalityRate = 0.9 | 1.0 | 1.1;
export interface Personality {
  attack:PersonalityRate
  defense:PersonalityRate
  special_attack:PersonalityRate
  special_defense:PersonalityRate
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
  offencePokemonList: Pokemon[];
  deffencePokemon: Pokemon;
  deffenceDummyPokemon: Pokemon;
}) {
  deffencePokemon.effective_value = {
    hp: calcRealValueHPStat(
      deffencePokemon.base.hp,
      deffenceDummyPokemon.effective_slider_step.hp
    ),
    attack: calcRealValueOtherStat(
      deffencePokemon.base.attack,
      deffenceDummyPokemon.effective_slider_step.attack,
      deffenceDummyPokemon.personality.attack
    ),
    defense: calcRealValueOtherStat(
      deffencePokemon.base.defense,
      deffenceDummyPokemon.effective_slider_step.defense,
      deffenceDummyPokemon.personality.defense
    ),
    special_attack: calcRealValueOtherStat(
      deffencePokemon.base.special_attack,
      deffenceDummyPokemon.effective_slider_step.special_attack,
      deffenceDummyPokemon.personality.special_attack
    ),
    special_defense: calcRealValueOtherStat(
      deffencePokemon.base.special_defense,
      deffenceDummyPokemon.effective_slider_step.special_defense,
      deffenceDummyPokemon.personality.special_defense
    ),
  };
  deffencePokemon.terasu_type = deffenceDummyPokemon.terasu_type;
  const kusatuonsenList: { [name: number]: number }[] = [];
  offencePokemonList.forEach((offencePokemon) => {
    offencePokemon.effective_value = {
      hp: calcRealValueHPStat(
        offencePokemon.base.hp,
        offencePokemon.effective_slider_step.hp
      ),
      attack: calcRealValueOtherStat(
        offencePokemon.base.attack,
        offencePokemon.effective_slider_step.attack,
        offencePokemon.personality.attack
      ),
      defense: calcRealValueOtherStat(
        offencePokemon.base.defense,
        offencePokemon.effective_slider_step.defense,
        offencePokemon.personality.defense
      ),
      special_attack: calcRealValueOtherStat(
        offencePokemon.base.special_attack,
        offencePokemon.effective_slider_step.special_attack,
        offencePokemon.personality.special_attack
      ),
      special_defense: calcRealValueOtherStat(
        offencePokemon.base.special_defense,
        offencePokemon.effective_slider_step.special_defense,
        offencePokemon.personality.special_defense
      ),
    };

    const move = offencePokemon.selected_move;
    if (move) {
      const rateMapper = {
        compatibilityRate: getCompatibilityTypeRate(
          offencePokemon,
          deffencePokemon
        ),
        sameTypeRate: calcOffenceMoveTypeRate(move, offencePokemon),
        multiscaleRate:1/2,
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
          deffencePokemon,
          rateMapper,
          loopHitNumber
        );
        kusatuonsenList.push(...listToMapper(calcedList));
      }
    }
  });
  const retTatamikomi = tatamikomi(kusatuonsenList);
  const damageList = Object.keys(retTatamikomi).map((v) => parseInt(v));
  const maxDamage = Math.max(...damageList);
  const minDamage = Math.min(...damageList);
  // if (minDamage >= deffencePokemon.effective_value.hp) {
  //   return `確定1発(${minDamage}~${maxDamage})`;
  // }
  return `(${minDamage}~${maxDamage})`;
}

function calcWithRand(
  move: Move,
  offencePokemon: Pokemon,
  deffencePokemon: Pokemon,
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
  offencePokemon: Pokemon;
  deffencePokemon: Pokemon;
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
  a = Math.floor(a * rateMapper.sameTypeRate);
  a = Math.floor(a * rateMapper.compatibilityRate);

  return a;
}

/**
 * けたぐり/くさむすびでの威力計算をする
 * @param deffencePokemon
 * @returns
 */
function calcPowerKetaguri(deffencePokemon: Pokemon): number {
  const w = deffencePokemon.base.weight;
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
  offencePokemon: Pokemon,
  deffencePokemon: Pokemon
): number {
  const offenceType = offencePokemon.selected_move?.type || 1;
  let deffenceTypeList = deffencePokemon.base.type_id_list;
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
function calcOffenceMoveTypeRate(move: Move, offencePokemon: Pokemon): number {
  if (offencePokemon.base.type_id_list.includes(move.type)) {
    return 1.5;
  }
  return 1.0;
}

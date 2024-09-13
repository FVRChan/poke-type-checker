import { Move, MOVE_DAMAGE_CLASS_PHYSICAL } from "./move";
import { Pokemon, pokemon_list } from "./pokemon";
import type_map from "./type-map";
import { calcRealValueHPStat, calcRealValueOtherStat } from "./util";

interface damageRateMapper {
  compatibilityRate: number;
  sameTypeRate: number;
  randRate: number;
}
export interface Effort {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}
export interface EffortSlider {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}
export interface Personality {
  attack: 0.9 | 1.0 | 1.1;
  defense: 0.9 | 1.0 | 1.1;
  special_attack: 0.9 | 1.0 | 1.1;
  special_defense: 0.9 | 1.0 | 1.1;
}
export interface EffectiveValue {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

// 名前
// 効率良い方法が欲しい。。。(4以上はもうクソ重い)
function kusatu(numberArray: number[][]): number[] {
  if (numberArray.length === 1) {
    return numberArray[0];
  }
  const newList: number[] = [];
  numberArray[0].forEach((a) => {
    numberArray[1].forEach((b) => {
      newList.push(a + b);
    });
  });
  const newArray = numberArray;
  newArray.splice(0, 2, newList);
  return kusatu(newArray);
}

export function calc_interface({
  offencePokemonList,
  deffencePokemon,
  deffenceDummyPokemon,
}: // moveList,
{
  offencePokemonList: Pokemon[];
  deffencePokemon: Pokemon;
  deffenceDummyPokemon: Pokemon;
  // moveList: Move[];
}) {
  const vectorList: number[][] = [];
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
        compatibilityRate: getCompatibilityTypeRate(move, deffencePokemon),
        sameTypeRate: getMovePokemonTypeRate(move, offencePokemon),
      } as damageRateMapper;
      const calcedList = calcWithRand(
        move,
        offencePokemon,
        deffencePokemon,
        rateMapper
      );
      vectorList.push(calcedList);
    }
  });

  // moveList.forEach((move) => {
  // });

  // const resList:number[]=[]
  // vectorList.forEach((v)=>{
  //   // v[0][0-15]
  //   // v[1][0-15]
  // })
  if (vectorList.length === 0) {
    return `0~0`;
  }
  const finalCalcedList = kusatu(vectorList);
  const maxDamage = Math.max(...finalCalcedList);
  const minDamage = Math.min(...finalCalcedList);
  return `(${minDamage}~${maxDamage})`;

  // 最後に確定なんちゃら～で出したい
  // const counter = calcedList
  //   .map((v) => {
  //     return deffencePokemon.effective_value.hp - v < 0;
  //   })
  //   .filter((v) => v);
  // if (counter.length === calcedList.length) {
  //   return `(${minDamage}~${maxDamage})`;
  // }
  // return `(${minDamage}~${maxDamage})`;
}

function calcWithRand(
  move: Move,
  offencePokemon: Pokemon,
  deffencePokemon: Pokemon,
  // rateList: number[]
  rateMapper: damageRateMapper
): Array<number> {
  const retList = [] as Array<number>;
  for (let rand = 0.85; rand <= 1.0; rand += 0.01) {
    rateMapper.randRate = rand;
    const base = calc({ move, offencePokemon, deffencePokemon, rateMapper });
    retList.push(base);
  }
  return retList;
}

function calc({
  move,
  offencePokemon,
  deffencePokemon,
  rateMapper,
}: {
  move: Move;
  offencePokemon: Pokemon;
  deffencePokemon: Pokemon;
  rateMapper: damageRateMapper;
}) {
  const power = move.power;
  const attack =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? offencePokemon.effective_value.attack
      : offencePokemon.effective_value.special_attack;
  const defense =
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
      ? deffencePokemon.effective_value.defense
      : deffencePokemon.effective_value.special_defense;

  // 基本
  let a = Math.floor((50 * 2) / 5 + 2);
  a = Math.floor((a * power * attack) / defense);
  a = Math.floor(a / 50 + 2);

  // 順番を守る
  a = Math.floor(a * rateMapper.randRate);
  a = Math.floor(a * rateMapper.sameTypeRate);
  a = Math.floor(a * rateMapper.compatibilityRate);

  return a;
}

function getCompatibilityTypeRate(
  offenceMove: Move,
  deffencePokemon: Pokemon
): number {
  const offenceType = offenceMove.type;
  const deffenceTypeList = deffencePokemon.base.type_id_list;
  let res = 1.0;
  const deffenceType1 = deffenceTypeList[0];
  const r1 = type_map[deffenceType1].damage_relations;
  if (r1.double_damage_from.includes(offenceType)) {
    res *= 2.0;
  } else if (r1.half_damage_from.includes(offenceType)) {
    res *= 0.5;
  } else if (r1.no_damage_from.includes(offenceType)) {
    res *= 0;
  }
  if (deffenceTypeList.length === 2) {
    const deffenceType2 = deffenceTypeList[1];
    const r2 = type_map[deffenceType2].damage_relations;
    if (r2.double_damage_from.includes(offenceType)) {
      res *= 2.0;
    } else if (r2.half_damage_from.includes(offenceType)) {
      res *= 0.5;
    } else if (r2.no_damage_from.includes(offenceType)) {
      res *= 0;
    }
  }
  return res;
}
function getMovePokemonTypeRate(move: Move, offencePokemon: Pokemon): number {
  if (offencePokemon.base.type_id_list.includes(move.type)) {
    return 1.5;
  }
  return 1.0;
}

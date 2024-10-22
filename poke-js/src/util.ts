// import ability_list, { Ability } from "./ability-list";
import { Ability } from "./ability";
import ability_list from "./ability-list";
import { PersonalityRate } from "./calc_damage";
import  { Move, MOVE_DAMAGE_CLASS_STATUS } from "./move";
import move_list from "./move-list";
import {
  Pokemon,
  PokemonDefenceInterface,
  PokemonOffenceInterface,
} from "./pokemon";

/**
 * 努力値計算(SliderのStep設定に苦戦したため0-32で考えて計算する関数)
 * 50レベル前提で考えているので1振りで4、2以上は4+8(n-1)で返す
 * @param step
 * @returns
 */
export function calcEffort(step: number): number {
  if (step === 0) {
    return 0;
  } else if (step === 1) {
    return 4;
  }
  return 4 + (step - 1) * 8;
}

/**
 * 指定したポケモンが覚える技(変化技除く)の一覧を返す。使用率の高い技を参照して上の方に持ってくる
 */
export function filterMoveList(p: Pokemon): Move[] {
  return move_list
    .filter((m) => {
      return (
        p.move_id_list.includes(m.id) &&
        m.damage_class_number !== MOVE_DAMAGE_CLASS_STATUS
      );
    })
    .sort((a: Move, b: Move) => {
      const rateA =
        p.often_used_move.indexOf(a.id) >= 0
          ? p.often_used_move.indexOf(a.id)
          : 999;
      const rateB =
        p.often_used_move.indexOf(b.id) >= 0
          ? p.often_used_move.indexOf(b.id)
          : 999;
      return rateA - rateB;
    });
}

/**
 * 指定したポケモンの特性一覧を返却(使用率の高い順番に並び替える)
 */
export function abilityList(p: Pokemon): Ability[] {
  return ability_list
    .filter((a) => {
      return p.ability_id_list.includes(a.id);
    })
    .sort((x: Ability, y: Ability) => {
      return (
        p.often_used_tokusei.indexOf(x.id) - p.often_used_tokusei.indexOf(y.id)
      );
    });
}

/**
 * きもったま、しんがんを確認する
 */
export function canScrappy(p: PokemonOffenceInterface): boolean {
  return (
    (p.selected_ability?.is_scrappy &&
      (p.selected_move?.type === 1 || p.selected_move?.type === 2)) ||
    false
  );
}

// export function canMultiscale(p: Pokemon): boolean {
//   return (
//     (p.adapt_deffence_ability && p.selected_ability?.is_multi_slace) || false
//   );
// }

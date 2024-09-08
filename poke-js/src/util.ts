import move_list, { Move, MOVE_DAMAGE_CLASS_STATUS } from "./move";
import { Pokemon } from "./pokemon-list";

// 努力値計算(SliderのStep設定に苦戦した)
export function calcEffort(step: number): number {
  if (step === 0) {
    return 0;
  } else if (step === 1) {
    return 4;
  }
  return 4 + (step - 1) * 8;
}

// 個体値31前提で計算している
export function calcRealValueOtherStat(
  b: number,
  es: number,
  p: 0.9 | 1.0 | 1.1
) {
  return Math.floor(p * (20 + b + es));
}

// 個体値31前提で計算している
export function calcRealValueHPStat(b: number, es: number) {
  return 75 + b + es;
}

export function sortMoveList(p: Pokemon): Move[] {
  return move_list
    .filter((m) => {
      return (
        p.base.move_id_list.includes(m.id) &&
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

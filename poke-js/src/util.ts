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

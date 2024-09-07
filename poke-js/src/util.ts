// 努力値計算(SliderのStep設定に苦戦した)
export function calcEffort(step: number): number {
  if (step === 0) {
    return 0;
  } else if (step === 1) {
    return 4;
  }
  return 4 + (step - 1) * 8;
}

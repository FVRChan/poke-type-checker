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
} from "../offence-pokemon/OffenceItem";
import {
  BATTLE_FIELD_EREKI,
  BATTLE_FIELD_PSYCHO_SAIKO,
} from "../other_setting";
import { otherSetting } from "../OtherSetting";
import { PokemonOffenceInterface, PokemonDefenceInterface } from "../pokemon";
import {
  POKEMON_TYPE_NORMAL,
  POKEMON_TYPE_FLYING,
  POKEMON_TYPE_ELECTRIC,
  POKEMON_TYPE_ICE,
  POKEMON_TYPE_ROCK,
  POKEMON_TYPE_GROUND,
  POKEMON_TYPE_STEEL,
  POKEMON_TYPE_PSYCHIC,
} from "../type";
import { nowGroundAttack } from "../util";
import {
  per_120,
  per_150,
  per_130,
  per_130_normal_jewel_field,
  per_110_punchglobe,
  per_110,
  calc_五捨五超入_gosutegoire,
} from "./calc_damage";

export function calc_move_power({
  move,
  offencePokemon,
  deffencePokemon,
  // rateMapper,
  loopHitNumber,
  otherSetting,
}: {
  move: Move;
  offencePokemon: PokemonOffenceInterface;
  deffencePokemon: PokemonDefenceInterface;
  // rateMapper: damageRateMapper;
  loopHitNumber: number;
  otherSetting: otherSetting;
}) {
  let power = move.power;
  if (move.is_ketaguri) {
    power = calcPowerKetaguri(deffencePokemon);
  }
  if (move.is_heavy_slam) {
    power = calcPowerHeavy({ offencePokemon, deffencePokemon });
  }
  if (move.is_ohakamairi) {
    power = offencePokemon.other_setting.powor_ohakamairi || 50;
  }
  // トリプルアクセル/トリプルキックの時、Hit回数によって威力が変わる
  if (move.id === 813 || move.id === 167) {
    power = power * loopHitNumber;
  }

  let rate = 4096;

  // フィールド×技
  // エレキフィールド
  if (otherSetting.battle_field === BATTLE_FIELD_EREKI) {
    // サイコブレイドは浮いててもOK
    if (move.is_psy_blade) {
      rate = Math.floor(rate * per_150);
    }
  }
  // サイコフィールド
  if (otherSetting.battle_field === BATTLE_FIELD_PSYCHO_SAIKO) {
    // ワイドフォースは自分が接地している必要
    if (move.is_wide_force && nowGroundAttack({ offencePokemon })) {
      rate = Math.floor(rate * per_150);
    }
  }

  // 特性
  // TODO : ノーマルスキン
  if (
    offencePokemon.selected_ability?.is_faily_skin &&
    move.type === POKEMON_TYPE_NORMAL
  ) {
    rate = Math.floor(rate * per_120);
  } else if (
    offencePokemon.selected_ability?.is_sky_skin &&
    move.type === POKEMON_TYPE_FLYING
  ) {
    rate = Math.floor(rate * per_120);
  } else if (
    offencePokemon.selected_ability?.is_ereki_skin &&
    move.type === POKEMON_TYPE_ELECTRIC
  ) {
    rate = Math.floor(rate * per_120);
  } else if (
    offencePokemon.selected_ability?.is_freeze_skin &&
    move.type === POKEMON_TYPE_ICE
  ) {
    rate = Math.floor(rate * per_120);
  } else if (move.is_kiru && offencePokemon.selected_ability?.is_kireazi) {
    rate = Math.floor(rate * per_150);
  } else if (
    move.is_hadou &&
    offencePokemon.selected_ability?.is_mega_launcher
  ) {
    rate = Math.floor(rate * per_150);
  } else if (move.is_oto && offencePokemon.selected_ability?.is_punkrock) {
    rate = Math.floor(rate * per_130);
  } else if (
    move.is_kamituki &&
    offencePokemon.selected_ability?.is_ganzixyouago
  ) {
    rate = Math.floor(rate * per_150);
  } else if (
    move.is_sutemi_waza &&
    offencePokemon.selected_ability?.is_sutemi
  ) {
    rate = Math.floor(rate * per_120);
  } else if (
    move.is_punch &&
    offencePokemon.selected_ability?.is_tetunokobushi
  ) {
    rate = Math.floor(rate * per_120);
  } else if (
    offencePokemon.selected_ability?.is_dokubousou &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
  ) {
    rate = Math.floor(rate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_netubousou &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL
  ) {
    rate = Math.floor(rate * per_150);
  } else if (
    offencePokemon.selected_ability?.is_sunanotikara &&
    (move.type === POKEMON_TYPE_ROCK ||
      move.type === POKEMON_TYPE_GROUND ||
      move.type === POKEMON_TYPE_STEEL)
  ) {
    rate = Math.floor(rate * per_130_normal_jewel_field);
  } else if (offencePokemon.selected_ability?.is_analyze) {
    rate = Math.floor(rate * per_130_normal_jewel_field);
  }

  // アイテム
  if (
    offencePokemon.selected_offencete_item_rate_id ===
      OFFENCE_ITEM_ID_PUNCHGLOVE &&
    move.is_punch
  ) {
    rate = Math.floor(rate * per_110_punchglobe);
  } else if (
    offencePokemon.selected_offencete_item_rate_id ===
      OFFENCE_ITEM_ID_TIKARANOHATIMAKI &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_PHYSICAL
  ) {
    rate = Math.floor(rate * per_110);
  } else if (
    offencePokemon.selected_offencete_item_rate_id ===
      OFFENCE_ITEM_ID_MONOSHIRIMEGANE &&
    move.damage_class_number === MOVE_DAMAGE_CLASS_SPECIAL
  ) {
    rate = Math.floor(rate * per_110);
  } else if (
    offencePokemon.selected_offencete_item_rate_id ===
      OFFENCE_ITEM_ID_NORMAL_JEWEL &&
    move.type === POKEMON_TYPE_NORMAL
  ) {
    rate = Math.floor(rate * per_130_normal_jewel_field);
  }

  // フィールド
  if (
    nowGroundAttack({ offencePokemon }) &&
    otherSetting.battle_field === BATTLE_FIELD_PSYCHO_SAIKO &&
    move.type === POKEMON_TYPE_PSYCHIC
  ) {
    rate = Math.floor(rate * per_130);
  }

  let finalPower = calc_五捨五超入_gosutegoire((power * rate) / 4096);
  if (finalPower < 1) {
    finalPower = 1;
  }

  return finalPower;
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

function calcPowerHeavy({
  offencePokemon,
  deffencePokemon,
}: {
  offencePokemon: PokemonOffenceInterface;
  deffencePokemon: PokemonDefenceInterface;
}): number {
  const temp = deffencePokemon.pokemon.weight / offencePokemon.pokemon.weight;
  if (temp < 1 / 5) {
    return 120;
  }
  if (temp < 1 / 4) {
    return 100;
  }
  if (temp < 1 / 3) {
    return 80;
  }
  if (temp < 1 / 2) {
    return 60;
  }
  return 40;
}

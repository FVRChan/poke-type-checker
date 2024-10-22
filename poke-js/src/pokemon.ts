import { isMobile } from "react-device-detect";
import { EffectiveValue, Personality } from "./calc_damage";
import { all_pokemon_list } from "./pokemon-list";
import { Move } from "./move";
import { filterMoveList } from "./util";
import { abilityList } from "./util";
import { Ability } from "./ability";
import { EffortSlider } from "./EffortSlider";
import { OFFENCE_ITEM_ID } from "./OffenceItem";
import { DEFENCE_ITEM_ID } from "./DefenceItem";
import { PokemonType } from "./type";

export interface Pokemon {
  id: number;
  name_ja: string;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  picture_url: string;
  species_id: number;
  type_id_list: Array<number>;
  ability_id_list: Array<number>;
  move_id_list: Array<number>;
  weight: number;
  usage_rate: number;
  often_used_move: Array<number>;
  often_used_tokusei: Array<number>;
  move_list?: Move[];
  ability_list?: Ability[];
  is_not_last_evolve:boolean;
}

export interface PokemonOffenceInterface {
  pokemon: Pokemon;
  effective_value: EffectiveValue;
  effective_slider_step: EffortSlider;
  personality: Personality;
  selected_move?: Move;
  selected_move_id?: number;
  selected_hit_number?: number;
  selected_ability?: Ability;
  selected_ability_id?: number;
  selected_offencete_item_rate_id?: OFFENCE_ITEM_ID;
  terasu_type?: PokemonType;
  rankCorrection: rankCorrection;
}

export interface PokemonDefenceInterface {
  pokemon: Pokemon;
  effective_value: EffectiveValue;
  effective_slider_step: EffortSlider;
  personality: Personality;
  selected_ability?: Ability;
  selected_ability_id?: number;
  terasu_type?: PokemonType;
  rankCorrection: rankCorrection;
  selected_defencete_item_rate_id?: DEFENCE_ITEM_ID;
}

export type rankCorrectionEnum =
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;
export interface rankCorrection {
  attack: rankCorrectionEnum;
  defense: rankCorrectionEnum;
  special_attack: rankCorrectionEnum;
  special_defense: rankCorrectionEnum;
}

export function toOffence(p: Pokemon): PokemonOffenceInterface {
  const ret = {
    pokemon: p,
    selected_ability: p.ability_list ? p.ability_list[0] : undefined,
    selected_move: p.move_list ? p.move_list[0] : undefined,
    effective_slider_step: {
      hp: 0,
      attack: 32,
      defense: 0,
      special_attack: 32,
      special_defense: 0,
    },
    effective_value: {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
    personality: {
      attack: 1.0,
      defense: 1.0,
      special_attack: 1.0,
      special_defense: 1.0,
    },
    rankCorrection: {
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
  } as PokemonOffenceInterface;
  ret.selected_ability_id = ret.selected_ability?.id;
  ret.selected_move_id = ret.selected_move?.id;
  return ret;
}
export function toDefence(p: Pokemon): PokemonDefenceInterface {
  const ret = {
    pokemon: p,
    selected_ability: p.ability_list ? p.ability_list[0] : undefined,
    effective_slider_step: {
      hp: 0,
      attack: 32,
      defense: 0,
      special_attack: 32,
      special_defense: 0,
    },
    effective_value: {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
    personality: {
      attack: 1.0,
      defense: 1.0,
      special_attack: 1.0,
      special_defense: 1.0,
    },
    rankCorrection: {
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
  } as PokemonDefenceInterface;
  // ret.selected_ability_id = ret.selected_ability?.id;
  // ret.selected_move_id = ret.selected_move?.id;
  return ret;
}

export const pokemon_list = all_pokemon_list
  .sort((a: Pokemon, b: Pokemon) => {
    if (a.usage_rate !== b.usage_rate) {
      return a.usage_rate - b.usage_rate;
    }
    return a.id - b.id;
  })
  .filter((p) => p.usage_rate < 999);
pokemon_list.forEach((p) => {
  p.move_list = filterMoveList(p);
  p.ability_list = abilityList(p);
});

export function pokemon_array(separate_number: number) {
  const t = isMobile ? 2 : 7;
  const local_separate_number = Math.min(t, separate_number);
  let ret_matrix = [] as Array<Array<PokemonDefenceInterface>>;
  let temp_list = [] as Array<PokemonDefenceInterface>;
  pokemon_list.forEach((p, _) => {
    temp_list.push(toDefence(p));
    if (temp_list.length >= local_separate_number) {
      ret_matrix.push(temp_list);
      temp_list = [];
    }
  });
  if (temp_list.length > 0) {
    ret_matrix.push(temp_list);
    temp_list = [];
  }
  return ret_matrix;
}

export function dummyPokemon(): PokemonDefenceInterface {
  const p = {
    pokemon: {
      id: 9999999,
      adapt_deffence_ability: false,
      name_ja: "ああああ",
      hp: 1,
      attack: 1,
      defense: 1,
      special_attack: 1,
      special_defense: 1,
      speed: 1,
      picture_url: "",
      species_id: 1,
      type_id_list: [],
      ability_id_list: [],
      move_id_list: [],
      weight: 1,
      terasu_type: 0,
      often_used_move: [],
      often_used_tokusei: [],
      usage_rate: 999,
      is_not_last_evolve:false,
    },
    effective_slider_step: {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
    effective_value: {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
    rankCorrection: {
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
    personality: {
      attack: 1.0,
      defense: 1.0,
      special_attack: 1.0,
      special_defense: 1.0,
    } as Personality,
  } as PokemonDefenceInterface;
  return p;
}

export const rankCorrectionEnumList: rankCorrectionEnum[] = [
  -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6,
];

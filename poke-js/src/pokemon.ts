import { isMobile } from "react-device-detect";
import { EffectiveValue, EffortSlider, Personality } from "./calc_damage";
import { all_pokemon_list } from "./pokemon-list";
import { Move } from "./move";
import { sortMoveList } from "./util";

export interface PokemonBase {
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
}
export interface Pokemon {
  id: number;
  base: PokemonBase;
  effective_value: EffectiveValue;
  effective_slider_step: EffortSlider;
  personality: Personality;
  usage_rate: number;
  often_used_move: Array<number>;
  selected_move?: Move;
  move_list?: Move[];
  selected_hit_number?: number;
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
  p.effective_slider_step = {
    hp: 0,
    attack: 32,
    defense: 0,
    special_attack: 32,
    special_defense: 0,
  };
  p.effective_value = {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
  };
  p.personality = {
    attack: 1.0,
    defense: 1.0,
    special_attack: 1.0,
    special_defense: 1.0,
  };
  p.selected_move = sortMoveList(p)[0];
  p.move_list = sortMoveList(p);
});

export function pokemon_array(separate_number: number) {
  let t = 10;
  // なんかisMobileがうまく動かない
  // console.log("isMobile => ",isMobile )
  if (isMobile) {
    t = 5;
  }
  const local_separate_number = Math.min(t, separate_number);
  let ret_matrix = [] as Array<Array<Pokemon>>;
  let temp_list = [] as Array<Pokemon>;
  pokemon_list.forEach((p, i) => {
    temp_list.push(p);
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

export function dummyPokemon(): Pokemon {
  const p = {
    id: 9999999,
    base: {
      id: 9999999,
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
    },
    often_used_move: [],
    usage_rate: 999,
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
    personality: {
      attack: 1.0,
      defense: 1.0,
      special_attack: 1.0,
      special_defense: 1.0,
    } as Personality,
  };
  return p;
}

import { isMobile } from "react-device-detect";
import { EffectiveValue, Personality } from "./calc_damage";
import { all_pokemon_list } from "./pokemon-list";
import { Move } from "./move";
import { filterMoveList } from "./util";
import { abilityList } from "./util";
import { Ability } from "./ability-list";
import { EffortSlider } from "./EffortSlider";

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
  // effective_value: EffectiveValue;
  // effective_slider_step: EffortSlider;
  // personality: Personality;
  usage_rate: number;
  often_used_move: Array<number>;
  often_used_tokusei: Array<number>;
  // selected_move?: Move;
  // selected_move_id?: number;
  move_list?: Move[];
  ability_list?: Ability[];
  // selected_hit_number?: number;
  // selected_ability?: Ability;
  // selected_ability_id?: number;
  // terasu_type?: number;
  // adapt_deffence_ability?: boolean;
}

export interface PokemonOffenceInterface {
  pokemon: Pokemon;
  // id: number;
  // name_ja: string;
  // hp: number;
  // attack: number;
  // defense: number;
  // special_attack: number;
  // special_defense: number;
  // speed: number;
  // picture_url: string;
  // species_id: number;
  // type_id_list: Array<number>;
  // ability_id_list: Array<number>;
  // move_id_list: Array<number>;
  // weight: number;
  effective_value: EffectiveValue;
  effective_slider_step: EffortSlider;
  personality: Personality;
  // usage_rate: number;
  // often_used_move: Array<number>;
  // often_used_tokusei: Array<number>;
  selected_move?: Move;
  selected_move_id?: number;
  // move_list?: Move[];
  // ability_list?: Ability[];
  selected_hit_number?: number;
  selected_ability?: Ability;
  selected_ability_id?: number;
  terasu_type?: number;
  // adapt_deffence_ability?: boolean;
}

export interface PokemonDefenceInterface {
  pokemon: Pokemon;
  // id: number;
  // name_ja: string;
  // hp: number;
  // attack: number;
  // defense: number;
  // special_attack: number;
  // special_defense: number;
  // speed: number;
  // picture_url: string;
  // species_id: number;
  // type_id_list: Array<number>;
  // ability_id_list: Array<number>;
  // move_id_list: Array<number>;
  // weight: number;
  effective_value: EffectiveValue;
  effective_slider_step: EffortSlider;
  personality: Personality;
  // usage_rate: number;
  // often_used_move: Array<number>;
  // often_used_tokusei: Array<number>;
  // selected_move?: Move;
  // selected_move_id?: number;
  // move_list?: Move[];
  // ability_list?: Ability[];
  // selected_hit_number?: number;
  selected_ability?: Ability;
  selected_ability_id?: number;
  terasu_type?: number;
  // adapt_deffence_ability?: boolean;
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
  } as PokemonOffenceInterface;
  ret.selected_ability_id = ret.selected_ability?.id;
  ret.selected_move_id = ret.selected_move?.id;
  return ret;
}
export function toDefence(p: Pokemon): PokemonDefenceInterface {
  const ret = {
    pokemon: p,
    selected_ability: p.ability_list ? p.ability_list[0] : undefined,
    // selected_move: p.move_list ? p.move_list[0] : undefined,
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
  } as PokemonOffenceInterface;
  ret.selected_ability_id = ret.selected_ability?.id;
  ret.selected_move_id = ret.selected_move?.id;
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
  // p.effective_slider_step = {
  //   hp: 0,
  //   attack: 32,
  //   defense: 0,
  //   special_attack: 32,
  //   special_defense: 0,
  // };
  // p.effective_value = {
  //   hp: 0,
  //   attack: 0,
  //   defense: 0,
  //   special_attack: 0,
  //   special_defense: 0,
  // };
  // p.personality = {
  //   attack: 1.0,
  //   defense: 1.0,
  //   special_attack: 1.0,
  //   special_defense: 1.0,
  // };
  p.move_list = filterMoveList(p);
  p.ability_list = abilityList(p);
  // 2回叩くのアレなので要改善
});
// pokemon_list.forEach((p) => {
//   p.selected_ability = p.ability_list ? p.ability_list[0] : undefined;
//   p.selected_move = p.move_list ? p.move_list[0] : undefined;
// });
// pokemon_list.forEach((p) => {
//   p.selected_ability_id = p.selected_ability?.id;
//   p.selected_move_id = p.selected_move?.id;
// });

// export function pokemon_array(separate_number: number) {
//   const t = isMobile ? 4 : 99;
//   const local_separate_number = Math.min(t, separate_number);
//   let ret_matrix = [] as Array<Array<Pokemon>>;
//   let temp_list = [] as Array<Pokemon>;
//   pokemon_list.forEach((p, _) => {
//     temp_list.push(p);
//     if (temp_list.length >= local_separate_number) {
//       ret_matrix.push(temp_list);
//       temp_list = [];
//     }
//   });
//   if (temp_list.length > 0) {
//     ret_matrix.push(temp_list);
//     temp_list = [];
//   }
//   return ret_matrix;
// }

export function pokemon_array(separate_number: number) {
  const t = isMobile ? 4 : 99;
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
    personality: {
      attack: 1.0,
      defense: 1.0,
      special_attack: 1.0,
      special_defense: 1.0,
    } as Personality,
  } as PokemonDefenceInterface;
  return p;
}

export interface typeCheckerI {
  [index: string]: boolean;
}
export interface typeToString {
  [index: string]: string;
}
export interface typeToEffects {
  [index: string]: { [index: string]: number };
}
export interface i_color_map {
  [index: number]: string;
}
export interface i_effect_num_map {
  [index: number]: number;
}
export interface i_moves {
  [index: string]: PokemonMove;
}

export interface Pokemon {
  pokemon_id: number;
  pokedex: number;
  form_number: number;
  pokemon_name: string;
  pokemon_type1_en: string;
  pokemon_type2_en: string;
  pokemon_type1_ja: string;
  pokemon_type2_ja: string;
  tokusei1: string;
  tokusei2: string;
  tokusei3: string;
  // hp: number;
  // attack: number;
  // defense: number;
  // special_attack: number;
  // special_defense: number;
  // speed: number;
  front_picture: string;
  used_rank: number;
  moves: PokemonMove[];
  move_id_list: number[];
  sm1: PokemonMove;
  sm2: PokemonMove;
  sm3: PokemonMove;
  sm4: PokemonMove;
  showMovelist: boolean;
}

export interface PokemonMove {
  accuracy: number;
  id: number;
  name: string;
  power: number;
  type_en: string;
  type_ja: string;
}

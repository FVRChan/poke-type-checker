import {
  PokemonMove,
  i_color_map,
  typeToEffects,
  typeToString,
} from "./interface";

// タイプ(英名=>分かりやすく)
export const type_en_to_ja = {
  normal: "ノーマル",
  fighting: "かくとう",
  flying: "ひこう",
  poison: "どく",
  ground: "じめん",
  rock: "いわ",
  bug: "むし",
  ghost: "ゴースト",
  steel: "はがね",
  fire: "ほのお",
  water: "みず",
  grass: "くさ",
  electric: "でんき",
  psychic: "エスパー",
  ice: "こおり",
  freezedry: "フリーズドライ",
  dragon: "ドラゴン",
  dark: "あく",
  fairy: "フェアリー",
} as typeToString;
export const type_en_to_kanji = {
  normal: "無",
  fighting: "闘",
  flying: "飛",
  poison: "毒",
  ground: "地",
  rock: "岩",
  bug: "虫",
  ghost: "霊",
  steel: "鋼",
  fire: "炎",
  water: "水",
  grass: "草",
  electric: "電",
  psychic: "超",
  ice: "氷",
  freezedry: "フ",
  dragon: "龍",
  dark: "悪",
  fairy: "妖",
} as typeToString;
// 特性によってはダメージが増えるとか減るとか
// TODO : 増える特性を考慮しよう
export const tokusei_map = {
  ちくでん: { electric: 0 },
  ひらいしん: { electric: 0 },
  でんきエンジン: { electric: 0 },
  もらいび: { fire: 0 },
  こんがりボディ: { fire: 0 },
  // かんそうはだ:{fire:1.25,water:0}, // 1.25を考慮したつくりじゃないのでTODO
  すいほう: { fire: 0.5 },
  たいねつ: { fire: 0.5 },
  ちょすい: { water: 0 },
  よびみず: { water: 0 },
  そうしょく: { grass: 0 },
  どしょく: { ground: 0 },
  ふゆう: { ground: 0 },
  きよめのしお: { ghost: 0.5 },
  あついしぼう: { fire: 0.5, ice: 0.5, freezedry: 0.5 },
} as typeToEffects;

export const color_map = {
  4: "gold",
  2: "khaki",
  1: "",
  0.5: "lightgray",
  0.25: "darkgray",
  0: "dimgray",
} as i_color_map;
export const allow_color_map = {
  4: "deeppink",
  2: "hotpink",
  1: "pink",
} as i_color_map;

export interface cookiePokemon {
  pokemon_id: number;
  pokedex: number;
  move1: PokemonMove;
  move2: PokemonMove;
  move3: PokemonMove;
  move4: PokemonMove;
  showMovelist: boolean;
}

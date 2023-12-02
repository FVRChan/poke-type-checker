import { typeToEffects, typeToString } from "./interface";

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
  export const tokusei_map = {
    ちくでん: { electric: 0 },
    ひらいしん: { electric: 0 },
    でんきエンジン: { electric: 0 },
    もらいび: { fire: 0 },
    こんがりボディ: { fire: 0 },
    すいほう: { fire: 0.5 },
    たいねつ: { fire: 0.5 },
    ちょすい: { water: 0 },
    よびみず: { water: 0 },
    そうしょく: { grass: 0 },
    どしょく: { ground: 0 },
    ふゆう: { ground: 0 },
    きよめのしお: { ghost: 0.5 },
  } as typeToEffects;
  
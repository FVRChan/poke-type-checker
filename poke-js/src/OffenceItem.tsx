import { MenuItem, Select } from "@mui/material";
import {
  Pokemon,
  PokemonDefenceInterface,
  PokemonOffenceInterface,
} from "./pokemon";
import { MOVE_DAMAGE_CLASS_PHYSICAL, MOVE_DAMAGE_CLASS_SPECIAL } from "./move";

export function OffenceItem({
  index,
  pokemon,
  setPokemon,
}: {
  index: number;
  pokemon: PokemonOffenceInterface;
  setPokemon: (i: number, p: PokemonOffenceInterface) => void;
}) {
  return (
    <Select
      size="small"
      value={pokemon.selected_offencete_item_rate_id}
      defaultValue={OFFENCE_ITEM_ID_NO_SET}
      // defaultValue={pokemon.selected_offencete_item_rate_id || OFFENCE_ITEM_ID_NO_SET||undefined}
      placeholder="アイテムを選択"
      label="アイテムを選択"
      onChange={(e) => {
        const tempPokemon = pokemon;
        tempPokemon.selected_offencete_item_rate_id = e.target.value as number;
        setPokemon(index, tempPokemon);
      }}
    >
      <MenuItem value={OFFENCE_ITEM_ID_NO_SET} selected>
        なし
      </MenuItem>
      {/* <MenuItem value={OFFENCE_ITEM_ID_ATTACK_15}>こだわりハチマキ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_SPECIEAL_ATTACK_15}>こだわりメガネ</MenuItem> */}
      <MenuItem value={OFFENCE_ITEM_ID_INOTINOTAMA_13}>いのちのたま</MenuItem>
      {/* <MenuItem value={OFFENCE_ITEM_ID_BATUGUN_12}>たつじんのおび</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_OMEN_12}>おめん</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_ATTACK_11}>ちからのハチマキ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_SPECIEAL_ATTACK_11}>ものしりメガネ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_NORMAL_13}>ノーマルジュエル</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_NORMAL_12}>シルクのスカーフ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_FIRE_12}>もくたん</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_WATER_12}>しんぴのしずく</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_ELECTRIC_12}>じしゃく</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_GRASS_12}>きせきのタネ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_ICE_12}>とけないこおり</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_FIGHTING_12}>くろおび</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_POISON_12}>どくバリ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_GROUND_12}>やわらかいすな</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_FLYING_12}>するどいくちばし</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_PSYCHIC_12}>まがったスプーン</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_BUG_12}>ぎんのこな</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_ROCK_12}>かたいいし</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_GHOST_12}>のろいのおふだ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_DRAGON_12}>りゅうのキバ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_DARK_12}>くろいメガネ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_STEEL_12}>メタルコート</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_FAIRY_12}>ようせいのハネ</MenuItem> */}
    </Select>
  );
}

export type OFFENCE_ITEM_ID = number;

export const OFFENCE_ITEM_ID_NO_SET: OFFENCE_ITEM_ID = 0;
export const OFFENCE_ITEM_ID_ATTACK_15: OFFENCE_ITEM_ID = 1;
export const OFFENCE_ITEM_ID_ATTACK_11: OFFENCE_ITEM_ID = 2;
export const OFFENCE_ITEM_ID_BATUGUN_12: OFFENCE_ITEM_ID = 3;
export const OFFENCE_ITEM_ID_OMEN_12: OFFENCE_ITEM_ID = 4;
export const OFFENCE_ITEM_ID_SPECIEAL_ATTACK_15: OFFENCE_ITEM_ID = 5;
export const OFFENCE_ITEM_ID_SPECIEAL_ATTACK_11: OFFENCE_ITEM_ID = 6;
export const OFFENCE_ITEM_ID_INOTINOTAMA_13: OFFENCE_ITEM_ID = 7;
export const OFFENCE_ITEM_ID_NORMAL_13: OFFENCE_ITEM_ID = 8;
export const OFFENCE_ITEM_ID_NORMAL_12: OFFENCE_ITEM_ID = 9;
export const OFFENCE_ITEM_ID_FIGHTING_12: OFFENCE_ITEM_ID = 10;
export const OFFENCE_ITEM_ID_FLYING_12: OFFENCE_ITEM_ID = 11;
export const OFFENCE_ITEM_ID_POISON_12: OFFENCE_ITEM_ID = 12;
export const OFFENCE_ITEM_ID_GROUND_12: OFFENCE_ITEM_ID = 13;
export const OFFENCE_ITEM_ID_ROCK_12: OFFENCE_ITEM_ID = 14;
export const OFFENCE_ITEM_ID_BUG_12: OFFENCE_ITEM_ID = 15;
export const OFFENCE_ITEM_ID_GHOST_12: OFFENCE_ITEM_ID = 16;
export const OFFENCE_ITEM_ID_STEEL_12: OFFENCE_ITEM_ID = 17;
export const OFFENCE_ITEM_ID_FIRE_12: OFFENCE_ITEM_ID = 18;
export const OFFENCE_ITEM_ID_WATER_12: OFFENCE_ITEM_ID = 19;
export const OFFENCE_ITEM_ID_GRASS_12: OFFENCE_ITEM_ID = 20;
export const OFFENCE_ITEM_ID_ELECTRIC_12: OFFENCE_ITEM_ID = 21;
export const OFFENCE_ITEM_ID_PSYCHIC_12: OFFENCE_ITEM_ID = 22;
export const OFFENCE_ITEM_ID_ICE_12: OFFENCE_ITEM_ID = 23;
export const OFFENCE_ITEM_ID_DRAGON_12: OFFENCE_ITEM_ID = 24;
export const OFFENCE_ITEM_ID_DARK_12: OFFENCE_ITEM_ID = 25;
export const OFFENCE_ITEM_ID_FAIRY_12: OFFENCE_ITEM_ID = 26;

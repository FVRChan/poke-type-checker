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
      defaultValue={pokemon.selected_offencete_item_rate_id || undefined}
      onChange={(e) => {
        const tempPokemon = pokemon;
        tempPokemon.selected_offencete_item_rate_id = e.target.value as number;
        setPokemon(index, tempPokemon);
      }}
    >
      <MenuItem value={undefined}>なし</MenuItem>
      <MenuItem value={ITEM_RATE_ID_ATTACK_15}>こだわりハチマキ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_SPECIEAL_ATTACK_15}>
        こだわりメガネ
      </MenuItem>
      <MenuItem value={ITEM_RATE_ID_INOTINOTAMA_13}>いのちのたま</MenuItem>
      <MenuItem value={ITEM_RATE_ID_BATUGUN_12}>たつじんのおび</MenuItem>
      <MenuItem value={ITEM_RATE_ID_OMEN_12}>おめん</MenuItem>
      <MenuItem value={ITEM_RATE_ID_ATTACK_11}>ちからのハチマキ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_SPECIEAL_ATTACK_11}>
        ものしりメガネ
      </MenuItem>
      <MenuItem value={ITEM_RATE_ID_NORMAL_13}>ノーマルジュエル</MenuItem>
      <MenuItem value={ITEM_RATE_ID_NORMAL_12}>シルクのスカーフ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_FIRE_12}>もくたん</MenuItem>
      <MenuItem value={ITEM_RATE_ID_WATER_12}>しんぴのしずく</MenuItem>
      <MenuItem value={ITEM_RATE_ID_ELECTRIC_12}>じしゃく</MenuItem>
      <MenuItem value={ITEM_RATE_ID_GRASS_12}>きせきのタネ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_ICE_12}>とけないこおり</MenuItem>
      <MenuItem value={ITEM_RATE_ID_FIGHTING_12}>くろおび</MenuItem>
      <MenuItem value={ITEM_RATE_ID_POISON_12}>どくバリ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_GROUND_12}>やわらかいすな</MenuItem>
      <MenuItem value={ITEM_RATE_ID_FLYING_12}>するどいくちばし</MenuItem>
      <MenuItem value={ITEM_RATE_ID_PSYCHIC_12}>まがったスプーン</MenuItem>
      <MenuItem value={ITEM_RATE_ID_BUG_12}>ぎんのこな</MenuItem>
      <MenuItem value={ITEM_RATE_ID_ROCK_12}>かたいいし</MenuItem>
      <MenuItem value={ITEM_RATE_ID_GHOST_12}>のろいのおふだ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_DRAGON_12}>りゅうのキバ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_DARK_12}>くろいメガネ</MenuItem>
      <MenuItem value={ITEM_RATE_ID_STEEL_12}>メタルコート</MenuItem>
      <MenuItem value={ITEM_RATE_ID_FAIRY_12}>ようせいのハネ</MenuItem>
    </Select>
  );
}

export type OFFENCE_ITEM_RATE_ID = number;
export type OFFENCE_ITEM_RATE = number;

export function GetRate(
  rateID: OFFENCE_ITEM_RATE_ID,
  offencePokemon: PokemonOffenceInterface
): OFFENCE_ITEM_RATE {
  if (
    rateID === ITEM_RATE_ID_ATTACK_15 &&
    offencePokemon.selected_move?.damage_class_number ===
      MOVE_DAMAGE_CLASS_PHYSICAL
  )
    return 1.5;
  if (
    rateID === ITEM_RATE_ID_ATTACK_11 &&
    offencePokemon.selected_move?.damage_class_number ===
      MOVE_DAMAGE_CLASS_PHYSICAL
  )
    return 1.1;
  if (rateID === ITEM_RATE_ID_BATUGUN_12) return 1.2;
  if (rateID === ITEM_RATE_ID_OMEN_12) return 1.2;
  if (
    rateID === ITEM_RATE_ID_SPECIEAL_ATTACK_15 &&
    offencePokemon.selected_move?.damage_class_number ===
      MOVE_DAMAGE_CLASS_SPECIAL
  )
    return 1.5;
  if (
    rateID === ITEM_RATE_ID_SPECIEAL_ATTACK_11 &&
    offencePokemon.selected_move?.damage_class_number ===
      MOVE_DAMAGE_CLASS_SPECIAL
  )
    return 1.1;
  if (rateID === ITEM_RATE_ID_INOTINOTAMA_13) return 1.3;
  if (rateID === ITEM_RATE_ID_NORMAL_13) return 1.3;
  if (rateID === ITEM_RATE_ID_NORMAL_12) return 1.2;
  if (rateID === ITEM_RATE_ID_FIGHTING_12) return 1.2;
  if (rateID === ITEM_RATE_ID_FLYING_12) return 1.2;
  if (rateID === ITEM_RATE_ID_POISON_12) return 1.2;
  if (rateID === ITEM_RATE_ID_GROUND_12) return 1.2;
  if (rateID === ITEM_RATE_ID_ROCK_12) return 1.2;
  if (rateID === ITEM_RATE_ID_BUG_12) return 1.2;
  if (rateID === ITEM_RATE_ID_GHOST_12) return 1.2;
  if (rateID === ITEM_RATE_ID_STEEL_12) return 1.2;
  if (rateID === ITEM_RATE_ID_FIRE_12) return 1.2;
  if (rateID === ITEM_RATE_ID_WATER_12) return 1.2;
  if (rateID === ITEM_RATE_ID_GRASS_12) return 1.2;
  if (rateID === ITEM_RATE_ID_ELECTRIC_12) return 1.2;
  if (rateID === ITEM_RATE_ID_PSYCHIC_12) return 1.2;
  if (rateID === ITEM_RATE_ID_ICE_12) return 1.2;
  if (rateID === ITEM_RATE_ID_DRAGON_12) return 1.2;
  if (rateID === ITEM_RATE_ID_DARK_12) return 1.2;
  if (rateID === ITEM_RATE_ID_FAIRY_12) return 1.2;
  return 1;
}

export const ITEM_RATE_ID_ATTACK_15: OFFENCE_ITEM_RATE = 1;
export const ITEM_RATE_ID_ATTACK_11: OFFENCE_ITEM_RATE = 2;
export const ITEM_RATE_ID_BATUGUN_12: OFFENCE_ITEM_RATE = 3;
export const ITEM_RATE_ID_OMEN_12: OFFENCE_ITEM_RATE = 4;
export const ITEM_RATE_ID_SPECIEAL_ATTACK_15: OFFENCE_ITEM_RATE = 5;
export const ITEM_RATE_ID_SPECIEAL_ATTACK_11: OFFENCE_ITEM_RATE = 6;
export const ITEM_RATE_ID_INOTINOTAMA_13: OFFENCE_ITEM_RATE = 7;
export const ITEM_RATE_ID_NORMAL_13: OFFENCE_ITEM_RATE = 8;
export const ITEM_RATE_ID_NORMAL_12: OFFENCE_ITEM_RATE = 9;
export const ITEM_RATE_ID_FIGHTING_12: OFFENCE_ITEM_RATE = 10;
export const ITEM_RATE_ID_FLYING_12: OFFENCE_ITEM_RATE = 11;
export const ITEM_RATE_ID_POISON_12: OFFENCE_ITEM_RATE = 12;
export const ITEM_RATE_ID_GROUND_12: OFFENCE_ITEM_RATE = 13;
export const ITEM_RATE_ID_ROCK_12: OFFENCE_ITEM_RATE = 14;
export const ITEM_RATE_ID_BUG_12: OFFENCE_ITEM_RATE = 15;
export const ITEM_RATE_ID_GHOST_12: OFFENCE_ITEM_RATE = 16;
export const ITEM_RATE_ID_STEEL_12: OFFENCE_ITEM_RATE = 17;
export const ITEM_RATE_ID_FIRE_12: OFFENCE_ITEM_RATE = 18;
export const ITEM_RATE_ID_WATER_12: OFFENCE_ITEM_RATE = 19;
export const ITEM_RATE_ID_GRASS_12: OFFENCE_ITEM_RATE = 20;
export const ITEM_RATE_ID_ELECTRIC_12: OFFENCE_ITEM_RATE = 21;
export const ITEM_RATE_ID_PSYCHIC_12: OFFENCE_ITEM_RATE = 22;
export const ITEM_RATE_ID_ICE_12: OFFENCE_ITEM_RATE = 23;
export const ITEM_RATE_ID_DRAGON_12: OFFENCE_ITEM_RATE = 24;
export const ITEM_RATE_ID_DARK_12: OFFENCE_ITEM_RATE = 25;
export const ITEM_RATE_ID_FAIRY_12: OFFENCE_ITEM_RATE = 26;

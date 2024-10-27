import { MenuItem, Select } from "@mui/material";
import { PokemonOffenceInterface } from "../pokemon";

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
      <MenuItem value={OFFENCE_ITEM_ID_KODAWARIHATIMAKI}>
        こだわりハチマキ
      </MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_KODAWARIMEGANE}>こだわりメガネ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_INOTINOTAMA}>いのちのたま</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_TIKARANOHATIMAKI}>
        ちからのハチマキ
      </MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_MONOSHIRIMEGANE}>
        ものしりメガネ
      </MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_PUNCHGLOVE}>パンチグローブ</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_NORMAL_JEWEL}>ノーマルジュエル</MenuItem>
      {/* <MenuItem value={OFFENCE_ITEM_ID_BATUGUN_12}>たつじんのおび</MenuItem>
      <MenuItem value={OFFENCE_ITEM_ID_OMEN_12}>おめん</MenuItem>
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

export const OFFENCE_ITEM_ID_NO_SET: OFFENCE_ITEM_ID = 775670783;
export const OFFENCE_ITEM_ID_KODAWARIHATIMAKI: OFFENCE_ITEM_ID = 667731897
export const OFFENCE_ITEM_ID_TIKARANOHATIMAKI: OFFENCE_ITEM_ID = 811830655
export const OFFENCE_ITEM_ID_KODAWARIMEGANE: OFFENCE_ITEM_ID = 917939879
export const OFFENCE_ITEM_ID_MONOSHIRIMEGANE: OFFENCE_ITEM_ID = 724819493
export const OFFENCE_ITEM_ID_INOTINOTAMA: OFFENCE_ITEM_ID = 968967646
export const OFFENCE_ITEM_ID_PUNCHGLOVE: OFFENCE_ITEM_ID = 152041385
export const OFFENCE_ITEM_ID_NORMAL_JEWEL: OFFENCE_ITEM_ID = 1520413853729873918


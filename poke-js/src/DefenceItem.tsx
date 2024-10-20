import { MenuItem, Select } from "@mui/material";
import { PokemonDefenceInterface } from "./pokemon";

export function DefenceItem({
  index,
  pokemon,
  setPokemon,
}: {
  index: number;
  pokemon: PokemonDefenceInterface;
  setPokemon: (i: number, p: PokemonDefenceInterface) => void;
}) {
  return (
    <Select
      size="small"
      value={pokemon.selected_defencete_item_rate_id}
      defaultValue={DEFENCE_ITEM_ID_NO_SET}
      placeholder="アイテムを選択"
      label="アイテムを選択"
      onChange={(e) => {
        const tempPokemon = pokemon;
        tempPokemon.selected_defencete_item_rate_id = e.target.value as number;
        setPokemon(index, tempPokemon);
      }}
    >
      <MenuItem value={DEFENCE_ITEM_ID_NO_SET} selected>
        なし
      </MenuItem>
      <MenuItem value={DEFENCE_ITEM_ID_ASSAULT_VEST}>とつげきチョッキ</MenuItem>
      <MenuItem value={DEFENCE_ITEM_ID_SINKANOKISEKI}>しんかのきせき</MenuItem>
    </Select>
  );
}

export type DEFENCE_ITEM_ID = number;
export const DEFENCE_ITEM_ID_NO_SET: DEFENCE_ITEM_ID = 0;
export const DEFENCE_ITEM_ID_ASSAULT_VEST: DEFENCE_ITEM_ID = 1;
export const DEFENCE_ITEM_ID_SINKANOKISEKI: DEFENCE_ITEM_ID = 2;

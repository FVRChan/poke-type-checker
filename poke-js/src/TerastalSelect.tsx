import { Select, MenuItem } from "@mui/material";
import { type_id_to_hiraganakatakana } from "./type-map";
import { PokemonDefenceInterface, PokemonOffenceInterface } from "./pokemon";

export function TerastalSelect({
  index,
  pokemon,
  setPokemon,
}: {
  index: number;
  pokemon: PokemonDefenceInterface | PokemonOffenceInterface;
  setPokemon:
    | ((i: number, p: PokemonDefenceInterface) => void)
    | ((i: number, p: PokemonOffenceInterface) => void);
}) {
  const tempArray = () => {
    const retList: number[] = [];
    for (let i = 1; i <= 18; i++) {
      retList.push(i);
    }
    return retList;
  };
  return (
    <Select
      defaultValue={0}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      size="small"
      value={pokemon.terasu_type}
      label="Age"
      onChange={(e) => {
        const tempPokemon = pokemon;
        tempPokemon.terasu_type = e.target.value as number;
        setPokemon(index, tempPokemon);
      }}
    >
      <MenuItem value={0} selected>
        なし
      </MenuItem>
      {tempArray().map((v, i) => {
        return (
          <MenuItem value={i + 1}>
            {type_id_to_hiraganakatakana(i + 1)}
          </MenuItem>
        );
      })}
    </Select>
  );
}

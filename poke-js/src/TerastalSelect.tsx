import { Select, MenuItem } from "@mui/material";
import { type_id_to_hiraganakatakana } from "./type-map";
import { PokemonDefenceInterface, PokemonOffenceInterface } from "./pokemon";
import { PokemonType } from "./type";

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
    const retList: PokemonType[] = [];
    for (let i = 1; i <= 19; i++) {
      retList.push(i as PokemonType);
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
        const local_type= e.target.value as PokemonType|undefined;
        tempPokemon.terasu_type =local_type
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

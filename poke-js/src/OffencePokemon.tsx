import { Grid, Autocomplete, TextField, Select, MenuItem } from "@mui/material";
import Effort from "./Effort";
import { Pokemon, pokemon_list } from "./pokemon";
import { type_id_to_kanji } from "./type-map";
function hitNumberOption(minHitNumber: number, maxHitNumber: number): number[] {
  const dummy_list: number[] = [];
  for (let a = minHitNumber; a <= maxHitNumber; a++) {
    dummy_list.push(a);
  }
  return dummy_list;
}
function OffencePokemon({
  offencePokemon,
  setOffencePokemon,
  index,
}: {
  offencePokemon: Pokemon;
  setOffencePokemon: (i: number, p: Pokemon) => void;
  index: number;
}) {
  return (
    <>
      <Grid container direction="column">
        <Grid container direction="column">
          <Grid>
            <Autocomplete
              value={offencePokemon}
              onChange={(_, p) => {
                if (p) {
                  setOffencePokemon(index, p);
                }
              }}
              disablePortal
              options={pokemon_list}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(p) => p.base.name_ja}
            />
          </Grid>
          <Grid>
            <div>
              <Autocomplete
                style={{ float: "left" }}
                value={offencePokemon.selected_move}
                onChange={(_, m) => {
                  if (m) {
                    const tempPokemon = offencePokemon;
                    tempPokemon.selected_move = m;
                    tempPokemon.selected_hit_number = m.min_renzoku
                      ? m.min_renzoku
                      : undefined;
                    setOffencePokemon(index, tempPokemon);
                  }
                }}
                disablePortal
                options={offencePokemon.move_list || []}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} />}
                getOptionLabel={(move) =>
                  `${move.name_ja}(${type_id_to_kanji(move.type)} : ${
                    move.power || "?"
                  })`
                }
              />
              {offencePokemon.selected_move?.is_renzoku && (
                <>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={offencePokemon.selected_hit_number}
                    label="Age"
                    onChange={(e) => {
                      const tempPokemon = offencePokemon;
                      tempPokemon.selected_hit_number = e.target
                        .value as number;
                      setOffencePokemon(index, tempPokemon);
                    }}
                  >
                    {hitNumberOption(
                      offencePokemon.selected_move.min_renzoku,
                      offencePokemon.selected_move.max_renzoku
                    ).map((aaaassss: number) => {
                      return <MenuItem value={aaaassss}>{aaaassss}</MenuItem>;
                    })}
                  </Select>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid>
          <Effort
            pokemon={offencePokemon}
            pokemonSetter={setOffencePokemon}
            isOffense
            isDefense={false}
            index={index}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default OffencePokemon;

import { Grid, Autocomplete, TextField } from "@mui/material";
import Effort from "./Effort";
import { Pokemon, pokemon_list } from "./pokemon";
import { type_id_to_kanji } from "./type-map";

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
                    setOffencePokemon(index, tempPokemon);
                  }
                }}
                disablePortal
                options={offencePokemon.move_list || []}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} />}
                getOptionLabel={(m) =>
                  `${m.name_ja}(${type_id_to_kanji(m.type)} : ${m.power})`
                }
              />
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

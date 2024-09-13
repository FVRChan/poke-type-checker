import { Grid, Autocomplete, TextField } from "@mui/material";
import Effort from "./Effort";
import { Pokemon, pokemon_list } from "./pokemon";
import { type_id_to_kanji } from "./type-map";

function OffencePokemon({
  offencePokemon,
  setOffencePokemon,
}: {
  offencePokemon: Pokemon;
  setOffencePokemon: React.Dispatch<React.SetStateAction<Pokemon>>;
}) {
  return (
    <>
      <Grid container direction="column">
        <h2>攻撃側</h2>
        <Grid>
          <Autocomplete
            value={offencePokemon}
            onChange={(_, p) => {
              if (p) {
                setOffencePokemon(p);
              }
            }}
            disablePortal
            options={pokemon_list}
            sx={{ width: 300 }}
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
                  setOffencePokemon((prev) => ({
                    ...prev,
                    selected_move: m,
                  }));
                }
              }}
              disablePortal
              options={offencePokemon.move_list || []}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(m) =>
                `${m.name_ja}(${type_id_to_kanji(m.type)} : ${m.power})`
              }
            />
          </div>
        </Grid>
        <Grid>
          <Effort
            pokemon={offencePokemon}
            pokemonSetter={setOffencePokemon}
            isOffense
            isDefense={false}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default OffencePokemon;

import { Grid, Autocomplete, TextField } from "@mui/material";
import Effort from "./Effort";
import { Pokemon, pokemon_list } from "./pokemon";
import { type_id_to_kanji } from "./type-map";
import { isMobile } from "react-device-detect";

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
            {isMobile?<>
            <select>{pokemon_list.map((pokemon)=>{return(<option>{pokemon.base.name_ja}</option>)})}</select>
            </>:<><Autocomplete
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
            /></>}
          </Grid>
          <Grid>
            <div>
              {isMobile?<><select>
                {offencePokemon.move_list?.map((move)=>{return(<option>{`${move.name_ja}(${type_id_to_kanji(move.type)} : ${move.power})`}</option>)})}
              </select>
              </>:<>              <Autocomplete
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
                getOptionLabel={(move) =>
                  `${move.name_ja}(${type_id_to_kanji(move.type)} : ${move.power})`
                }
              />
</>}
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

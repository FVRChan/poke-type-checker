import { Grid, Select, MenuItem } from "@mui/material";

// import ability_list, { Ability } from "./ability-list";
import OffenceEffort from "./OffenceEffort";
import { OffenceItem } from "./OffenceItem";
import ability_list from "../ability-list";
import { PokemonOffenceInterface, pokemon_list, toOffence } from "../pokemon";
import { TerastalSelect } from "../TerastalSelect";
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
  offencePokemon: PokemonOffenceInterface;
  setOffencePokemon: (i: number, p: PokemonOffenceInterface) => void;
  index: number;
}) {
  return (
    <>
      <Grid container direction="column">
        <Grid container direction="column">
          <Grid>
            <Select
              size="small"
              value={offencePokemon.pokemon.id}
              defaultValue={offencePokemon.pokemon.id}
              onChange={(e) => {
                const tempID =
                  typeof e.target.value === "number"
                    ? e.target.value
                    : parseInt(e.target.value);
                const tempPokemon = pokemon_list.filter(
                  (p) => p.id === tempID
                )[0];
                if (tempPokemon) {
                  setOffencePokemon(index, toOffence(tempPokemon));
                }
              }}
            >
              {pokemon_list.map((p) => {
                return <MenuItem value={p.id}>{p.name_ja}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid>
            <div>
              <Select
                size="small"
                style={{ float: "left" }}
                value={offencePokemon.selected_move_id}
                defaultValue={offencePokemon.selected_move_id}
                onChange={(e) => {
                  const tempPokemon = offencePokemon;
                  tempPokemon.selected_move_id =
                    typeof e.target.value === "string"
                      ? parseInt(e.target.value)
                      : e.target.value;
                  tempPokemon.selected_move =
                    offencePokemon.pokemon.move_list?.filter(
                      (m) => m.id === tempPokemon.selected_move_id
                    )[0];
                  if (tempPokemon.selected_move?.is_renzoku) {
                    tempPokemon.selected_hit_number =
                      tempPokemon.selected_move.min_renzoku;
                  }
                  setOffencePokemon(index, tempPokemon);
                }}
              >
                {offencePokemon.pokemon.move_list?.map((m) => {
                  return <MenuItem value={m.id}>{m.name_ja}</MenuItem>;
                })}
              </Select>
              {offencePokemon.selected_move?.is_renzoku && (
                <>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={offencePokemon.selected_hit_number}
                    label="えｗくぇｗくぇｗくぇｗｑ"
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
                  回
                </>
              )}
              {offencePokemon.selected_move?.is_ohakamairi && (
                <>
                  <Select
                    size="small"
                    defaultValue={50}
                    value={offencePokemon?.other_setting?.powor_ohakamairi}
                    onChange={(e) => {
                      const tempPokemon = offencePokemon;
                      tempPokemon.other_setting.powor_ohakamairi = e.target
                        .value as number;
                      setOffencePokemon(index, tempPokemon);
                    }}
                  >
                    <MenuItem selected value={50}>
                      50
                    </MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={150}>150</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={250}>250</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={350}>350</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                  </Select>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={offencePokemon.selected_ability_id}
            defaultValue={offencePokemon.selected_ability_id}
            label="Age"
            onChange={(e) => {
              const tempPokemon = offencePokemon;
              tempPokemon.selected_ability_id =
                typeof e.target.value === "string"
                  ? parseInt(e.target.value)
                  : e.target.value;
              tempPokemon.selected_ability = ability_list.filter(
                (a) => a.id === tempPokemon.selected_ability_id
              )[0];
              setOffencePokemon(index, tempPokemon);
            }}
          >
            {offencePokemon.pokemon.ability_list &&
              offencePokemon.pokemon.ability_list.map((a) => {
                return <MenuItem value={a.id}>{a.name_ja}</MenuItem>;
              })}
          </Select>
        </Grid>
        <Grid>
          <OffenceEffort
            pokemon={offencePokemon}
            pokemonSetter={setOffencePokemon}
            index={index}
          />
        </Grid>
      </Grid>
      <TerastalSelect
        pokemon={offencePokemon}
        setPokemon={setOffencePokemon}
        index={index}
      ></TerastalSelect>
      <OffenceItem
        pokemon={offencePokemon}
        setPokemon={setOffencePokemon}
        index={index}
      ></OffenceItem>
    </>
  );
}
export default OffencePokemon;

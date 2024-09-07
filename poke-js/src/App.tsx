import React from "react";
import {
  pokemon_list,
  pokemon_array,
  Pokemon,
  dummyPokemon,
} from "./pokemon-list";
import move_list, { Move, MOVE_DAMAGE_CLASS_PHYSICAL } from "./move";
import {
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Autocomplete,
  TextField,
  Grid,
} from "@mui/material";
import { calc_interface } from "./calc_damage";
import Effort from "./Effort";
export default function App() {
  const [offencePokemon, setOffencePokemon] = React.useState<Pokemon>(
    pokemon_list[0]
  );
  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<Pokemon>(dummyPokemon);
  const [offenceMove, setOffenceMove] = React.useState<Move>(move_list[0]);

  return (
    <div className="App">
      <div>
        <Grid container spacing={2}>
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
            <Autocomplete
              value={offenceMove}
              onChange={(_, m) => {
                if (m) {
                  setOffenceMove(m);
                }
              }}
              disablePortal
              options={move_list}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(m) => m.name_ja}
            />
            威力{offenceMove.power}({offenceMove.type})
          </Grid>
        </Grid>
        <Grid container direction={"column"}>
          <h2>攻撃側努力値</h2>
          <Effort pokemon={offencePokemon} pokemonSetter={setOffencePokemon} />
        </Grid>
        <Grid container direction={"column"}>
          <h2>守備側努力値</h2>
          <Effort
            pokemon={deffenceDummyPokemon}
            pokemonSetter={setDeffenceDummyPokemon}
          />
        </Grid>
        <h2>ポケモン表</h2>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {pokemon_array.map((list) => {
                return (
                  <TableRow
                    key={list
                      .map((p) => {
                        return p.base.name_ja;
                      })
                      .join("")}
                  >
                    {list.map((poke) => {
                      return (
                        <TableCell style={{ background: "" }}>
                          {poke.base.picture_url ? (
                            <img
                              src={poke.base.picture_url}
                              width={75}
                              height={75}
                            ></img>
                          ) : (
                            <>
                              <div>{poke.base.name_ja}</div>
                            </>
                          )}
                          <div>
                            {calc_interface({
                              offencePokemon,
                              deffencePokemon: poke,
                              deffenceDummyPokemon,
                              move: offenceMove,
                            })}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

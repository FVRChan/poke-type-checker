import React, { useRef } from "react";
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
import { sortMoveList } from "./util";
import { useWindowSize } from "./useWindowSize";
import { type_id_to_kanji } from "./type-map";
export default function App() {
  const [offencePokemon, setOffencePokemon] = React.useState<Pokemon>(
    pokemon_list[0]
  );
  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<Pokemon>(dummyPokemon);
  const [offenceMove, setOffenceMove] = React.useState<Move>(
    sortMoveList(offencePokemon)[0]
  );

  return (
    <div className="App">
      <div>
        <Grid container direction="column">
          <Grid>
            <Autocomplete
              value={offencePokemon}
              onChange={(_, p) => {
                if (p) {
                  setOffencePokemon(p);
                  setOffenceMove(sortMoveList(p)[0]);
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
              options={sortMoveList(offencePokemon)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(m) =>
                `${m.name_ja}(${type_id_to_kanji(m.type)} : ${m.power})`
              }
            />
          </Grid>
          <Grid>
            <h2>攻撃側</h2>
            <Effort
              pokemon={offencePokemon}
              pokemonSetter={setOffencePokemon}
              isOffense
              isDefense={false}
            />
            <h2>守備側</h2>
            <Effort
              pokemon={deffenceDummyPokemon}
              pokemonSetter={setDeffenceDummyPokemon}
              isOffense={false}
              isDefense
            />
          </Grid>
        </Grid>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody 
            style={{maxWidth:`${useWindowSize()}px`}}
            >
              {pokemon_array((useWindowSize().width - 50) / 110).map((list) => {
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
                              width={55}
                              height={55}
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

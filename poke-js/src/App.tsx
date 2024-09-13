import React, { useRef } from "react";
import { pokemon_list, pokemon_array, Pokemon, dummyPokemon } from "./pokemon";
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
  Box,
} from "@mui/material";
import { calc_interface } from "./calc_damage";
import Effort from "./Effort";
import { sortMoveList } from "./util";
import { useWindowSize } from "./useWindowSize";
import { type_id_to_kanji } from "./type-map";
import SideBar from "./Sidebar";
import TemporaryDrawer from "./Drawer";
// import Takashi from "./Takashi";
export default function App() {
  const [offencePokemon, setOffencePokemon] = React.useState<Pokemon>(
    pokemon_list[0]
  );
  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<Pokemon>(dummyPokemon);
  const [offenceMoveList, setOffenceMoveList] = React.useState<Move[]>([
    sortMoveList(offencePokemon)[0],
  ]);

  return (
    <div className="App">
      <div>
        <Box sx={{ display: "flex" }}>
          <SideBar
            children={
              <>
                <Grid container direction="column">
                  <Grid>
                    <Autocomplete
                      value={offencePokemon}
                      onChange={(_, p) => {
                        if (p) {
                          setOffencePokemon(p);
                          setOffenceMoveList([sortMoveList(p)[0]]);
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
                    {offenceMoveList.map((offenceMove, i) => {
                      return (
                        <>
                          <div>
                            <Autocomplete
                              style={{ float: "left" }}
                              value={offenceMove}
                              onChange={(_, m) => {
                                if (m) {
                                  const newList = offenceMoveList;
                                  newList.splice(i, 1, m);
                                  setOffenceMoveList([...newList]);
                                }
                              }}
                              disablePortal
                              options={sortMoveList(offencePokemon)}
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              getOptionLabel={(m) =>
                                `${m.name_ja}(${type_id_to_kanji(m.type)} : ${
                                  m.power
                                })`
                              }
                            />
                            {offenceMoveList.length > 1 && (
                              <button
                                style={{ float: "left" }}
                                onClick={() => {
                                  if (offenceMoveList.length > 1) {
                                    const newList = offenceMoveList;
                                    newList.splice(i, 1);
                                    setOffenceMoveList([...newList]);
                                  }
                                }}
                              >
                                x
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </Grid>
                  <Grid>
                    {offenceMoveList.length < 3 && (
                      <button
                        onClick={() => {
                          const newList = offenceMoveList;
                          newList.splice(
                            offenceMoveList.length,
                            0,
                            sortMoveList(offencePokemon)[0]
                          );
                          setOffenceMoveList([...newList]);
                        }}
                      >
                        +
                      </button>
                    )}
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
              </>
            }
          ></SideBar>
          {/* <TemporaryDrawer></TemporaryDrawer> */}
          <Grid container direction="column">
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableBody style={{ maxWidth: `${useWindowSize()}px` }}>
                  {pokemon_array((useWindowSize().width - 50) / 110).map(
                    (list) => {
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
                                    moveList: offenceMoveList,
                                  })}
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

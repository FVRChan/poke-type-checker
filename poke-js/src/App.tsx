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
import OffencePokemon from "./OffencePokemon";
import DefencePokemon from "./DefencePokemon";
import Body from "./Body";
export default function App() {
  const [offencePokemon, setOffencePokemon] = React.useState<Pokemon>(
    pokemon_list[0]
  );
  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<Pokemon>(dummyPokemon);

  return (
    <div className="App">
      <div>
        <Box sx={{ display: "flex" }}>
          <SideBar
            children={
              <Grid container direction="column">
                <Grid>
                  <OffencePokemon
                    offencePokemon={offencePokemon}
                    setOffencePokemon={setOffencePokemon}
                  ></OffencePokemon>
                </Grid>
                <Grid>
                  <DefencePokemon
                    deffenceDummyPokemon={deffenceDummyPokemon}
                    setDeffenceDummyPokemon={setDeffenceDummyPokemon}
                  ></DefencePokemon>
                </Grid>
              </Grid>
            }
          ></SideBar>
          {/* 入れ替えたい(スマフォ対応的な感じで) */}
          {/* <TemporaryDrawer></TemporaryDrawer> */}
          <Grid container direction="column">
            <Body
              offencePokemon={offencePokemon}
              deffenceDummyPokemon={deffenceDummyPokemon}
            ></Body>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

import React from "react";
import { pokemon_list, Pokemon, dummyPokemon } from "./pokemon";
import { Grid, Box, AppBar } from "@mui/material";
import SideBar from "./Sidebar";
import OffencePokemon from "./OffencePokemon";
import DefencePokemon from "./DefencePokemon";
import Body from "./Body";
import TemporaryDrawer from "./Drawer";
import SideMenu from "./SideMenu";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "./useWindowSize";
// 負けた気はするがとりあえず行ける
function copyPokemon(p: Pokemon): Pokemon {
  return JSON.parse(JSON.stringify(p));
}
export default function App() {
  const [offencePokemonList, setOffencePokemonList] = React.useState<Pokemon[]>(
    [copyPokemon(pokemon_list[0])]
  );
  const handleAddOffencePokemonList = () => {
    const temp = offencePokemonList;
    temp.splice(temp.length, 0, copyPokemon(pokemon_list[0]));
    setOffencePokemonList([...temp]);
  };
  const handleRemoveOffencePokemonList = (i: number) => {
    const temp = offencePokemonList;
    temp.splice(i, 1);
    setOffencePokemonList([...temp]);
  };
  const handleSaveOffencePokemonList = (i: number, p: Pokemon) => {
    const temp = offencePokemonList;
    temp.splice(i, 1, p);
    setOffencePokemonList([...temp]);
  };
  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<Pokemon>(dummyPokemon);
  const handleSaveDeffenceDummyPokemon = (i: number, p: Pokemon) => {
    setDeffenceDummyPokemon((prev) => ({ ...prev }));
  };

  const [open, setopen] = React.useState(false);
  const toggleOpen = () => {
    setopen(!open);
  };

  return (
    <div className="App">
      <div>
        <Box sx={{ display: "flex" }}>
          {isMobile ? (
            <>
              <TemporaryDrawer
                open={open}
                toggleOpen={toggleOpen}
                children={
                  <SideMenu
                    offencePokemonList={offencePokemonList}
                    handleSaveOffencePokemonList={handleSaveOffencePokemonList}
                    handleRemoveOffencePokemonList={
                      handleRemoveOffencePokemonList
                    }
                    handleAddOffencePokemonList={handleAddOffencePokemonList}
                    deffenceDummyPokemon={deffenceDummyPokemon}
                    handleSaveDeffenceDummyPokemon={
                      handleSaveDeffenceDummyPokemon
                    }
                  />
                }
              ></TemporaryDrawer>
            </>
          ) : (
            <>
              {" "}
              <SideBar
                children={
                  <SideMenu
                    offencePokemonList={offencePokemonList}
                    handleSaveOffencePokemonList={handleSaveOffencePokemonList}
                    handleRemoveOffencePokemonList={
                      handleRemoveOffencePokemonList
                    }
                    handleAddOffencePokemonList={handleAddOffencePokemonList}
                    deffenceDummyPokemon={deffenceDummyPokemon}
                    handleSaveDeffenceDummyPokemon={
                      handleSaveDeffenceDummyPokemon
                    }
                  />
                }
              ></SideBar>
            </>
          )}
          <Grid container direction="column" style={{ width: "95%" }}>
            {isMobile && <button onClick={toggleOpen}>menu open</button>}
            <Body
              offencePokemonList={offencePokemonList}
              deffenceDummyPokemon={deffenceDummyPokemon}
            ></Body>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

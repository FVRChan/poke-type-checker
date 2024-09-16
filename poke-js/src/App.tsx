import React from "react";
import { pokemon_list, Pokemon, dummyPokemon } from "./pokemon";
import {
  Grid,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SideBar from "./Sidebar";
import OffencePokemon from "./OffencePokemon";
import DefencePokemon from "./DefencePokemon";
import Body from "./Body";
import TemporaryDrawer from "./Drawer";
import SideMenu from "./SideMenu";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "./useWindowSize";
import { useViewModel } from "./useViewModel";
import { Menu } from "@mui/icons-material";
export default function App() {
  const {
    smartphoneDrawerOpen,
    togglesmartphoneDrawerOpen,
    offencePokemonList,
    setOffencePokemonList,
    handleAddOffencePokemonList,
    handleRemoveOffencePokemonList,
    handleSaveOffencePokemonList,
    deffenceDummyPokemon,
    setDeffenceDummyPokemon,
    handleSaveDeffenceDummyPokemon,
  } = useViewModel();
  return (
    <div className="App">
      <div>
        <Box sx={{ display: "flex" }}>
          {isMobile ? (
            <>
              <TemporaryDrawer
                open={smartphoneDrawerOpen}
                toggleOpen={togglesmartphoneDrawerOpen}
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
          <Grid container direction="column">
            {isMobile && (
              <AppBar
                position="sticky"
                style={{
                  width: "105%",
                  marginLeft: "-10px",
                  marginTop: "-10px",
                }}
              >
                <Toolbar variant="dense">
                  <IconButton
                    onClick={togglesmartphoneDrawerOpen}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                  >
                    <Menu />
                  </IconButton>
                  <Typography variant="h6" color="inherit" component="div">
                    
                  </Typography>
                </Toolbar>
              </AppBar>
            )}
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

import React from "react";
import { pokemon_list, Pokemon, dummyPokemon } from "./pokemon";
import { Grid, Box } from "@mui/material";
import SideBar from "./Sidebar";
import OffencePokemon from "./OffencePokemon";
import DefencePokemon from "./DefencePokemon";
import Body from "./Body";
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

  return (
    <div className="App">
      <div>
        <Box sx={{ display: "flex" }}>
          <SideBar
            children={
              <Grid container direction="column">
                <Grid>
                  <h2>攻撃側</h2>
                  {offencePokemonList.map((offencePokemon, i) => {
                    return (
                      <>
                        <OffencePokemon
                          offencePokemon={offencePokemon}
                          setOffencePokemon={handleSaveOffencePokemonList}
                          index={i}
                        ></OffencePokemon>
                        {offencePokemonList.length > 1 && (
                          <div style={{ textAlign: "center" }}>
                            <button
                              onClick={() => {
                                handleRemoveOffencePokemonList(i);
                              }}
                            >
                              -
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })}
                  <div style={{ textAlign: "center" }}>
                    {offencePokemonList.length < 3 && (
                      <button
                        onClick={() => {
                          handleAddOffencePokemonList();
                        }}
                      >
                        +
                      </button>
                    )}
                  </div>
                </Grid>
                <Grid>
                  <h2>防御側</h2>
                  <DefencePokemon
                    deffenceDummyPokemon={deffenceDummyPokemon}
                    setDeffenceDummyPokemon={handleSaveDeffenceDummyPokemon}
                  ></DefencePokemon>
                </Grid>
              </Grid>
            }
          ></SideBar>
          {/* 入れ替えたい(スマフォ対応的な感じで) */}
          {/* <TemporaryDrawer></TemporaryDrawer> */}
          <Grid container direction="column">
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

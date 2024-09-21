import { Grid } from "@mui/material";
import DefencePokemon from "./DefencePokemon";
import OffencePokemon from "./OffencePokemon";
import { Pokemon, PokemonOffenceInterface } from "./pokemon";
import { useWindowSize } from "./useWindowSize";

function SideMenu({
  offencePokemonList,
  handleSaveOffencePokemonList,
  handleRemoveOffencePokemonList,
  handleAddOffencePokemonList,
  deffenceDummyPokemon,
  handleSaveDeffenceDummyPokemon,
}: {
  offencePokemonList: PokemonOffenceInterface[];
  handleSaveOffencePokemonList: (i: number, p: PokemonOffenceInterface) => void;
  handleRemoveOffencePokemonList: (i: number) => void;
  handleAddOffencePokemonList: () => void;
  deffenceDummyPokemon: Pokemon;
  handleSaveDeffenceDummyPokemon: (i: number, p: Pokemon) => void;
}) {
  return (
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
  );
}
export default SideMenu;

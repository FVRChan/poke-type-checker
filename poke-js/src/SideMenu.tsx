import { Grid, IconButton } from "@mui/material";
import { PokemonDefenceInterface, PokemonOffenceInterface } from "./pokemon";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import DefencePokemon from "./defence-pokemon/DefencePokemon";
import OffencePokemon from "./offence-pokemon/OffencePokemon";
import OtherSetting, { otherSetting } from "./OtherSetting";

function SideMenu({
  offencePokemonList,
  handleSaveOffencePokemonList,
  handleRemoveOffencePokemonList,
  handleAddOffencePokemonList,
  deffenceDummyPokemon,
  handleSaveDeffenceDummyPokemon,
  otherSetting,
  handleSaveOtherSetting,
}: {
  offencePokemonList: PokemonOffenceInterface[];
  handleSaveOffencePokemonList: (i: number, p: PokemonOffenceInterface) => void;
  handleRemoveOffencePokemonList: (i: number) => void;
  handleAddOffencePokemonList: () => void;
  deffenceDummyPokemon: PokemonDefenceInterface;
  handleSaveDeffenceDummyPokemon: (
    i: number,
    p: PokemonDefenceInterface
  ) => void;
  otherSetting: otherSetting;
  handleSaveOtherSetting: (v: otherSetting) => void;
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
                  <IconButton
                    onClick={() => {
                      handleRemoveOffencePokemonList(i);
                    }}
                  >
                    <RemoveCircle />
                  </IconButton>
                </div>
              )}
            </>
          );
        })}

        <div style={{ textAlign: "center" }}>
          {offencePokemonList.length < 3 && (
            <IconButton
              onClick={() => {
                handleAddOffencePokemonList();
              }}
            >
              <AddCircle />
            </IconButton>
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

      <Grid>
        <h2>その他</h2>
        <OtherSetting
          otherSetting={otherSetting}
          handleSaveOtherSetting={handleSaveOtherSetting}
        ></OtherSetting>
      </Grid>
      <div style={{ margin: "80px" }}></div>
    </Grid>
  );
}
export default SideMenu;

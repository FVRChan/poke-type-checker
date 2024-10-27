import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  pokemon_array,
  PokemonDefenceInterface,
  PokemonOffenceInterface,
} from "./pokemon";
import { useWindowSize } from "./useWindowSize";
import { ShowEffortValue } from "./ShowEffortValue";
import { otherSetting } from "./OtherSetting";
import { calc_interface } from "./calc-damage/calc_damage";

function Body({
  offencePokemonList,
  deffenceDummyPokemon,
  otherSetting,
}: {
  offencePokemonList: PokemonOffenceInterface[];
  deffenceDummyPokemon: PokemonDefenceInterface;
  otherSetting: otherSetting;
}) {
  return (
    <>
      <TableContainer style={{ width: "97%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody style={{ maxWidth: `${useWindowSize()}px` }}>
            {pokemon_array((useWindowSize().width - 50) / 150).map(
              (deffencePokemonList) => {
                return (
                  <TableRow
                    key={deffencePokemonList
                      .map((p) => {
                        return p.pokemon.name_ja;
                      })
                      .join("")}
                  >
                    {deffencePokemonList.map((deffencePokemon) => {
                      return (
                        <TableCell
                          style={{
                            background: "",
                            maxWidth: "85px",
                            maxHeight: "85px",
                          }}
                        >
                          {deffencePokemon.pokemon.picture_url ? (
                            <img
                              src={deffencePokemon.pokemon.picture_url}
                              width={55}
                              height={55}
                            ></img>
                          ) : (
                            <>
                              <div>{deffencePokemon.pokemon.name_ja}</div>
                            </>
                          )}

                          <div>
                            {calc_interface({
                              offencePokemonList,
                              deffencePokemon,
                              deffenceDummyPokemon,
                              otherSetting,
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
    </>
  );
}
export default Body;

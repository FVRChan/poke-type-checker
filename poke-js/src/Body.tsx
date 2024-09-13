import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { calc_interface } from "./calc_damage";
import { Pokemon, pokemon_array } from "./pokemon";
import { useWindowSize } from "./useWindowSize";

function Body({
  offencePokemonList,
  deffenceDummyPokemon,
}: {
  offencePokemonList: Pokemon[];
  deffenceDummyPokemon: Pokemon;
}) {
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableBody style={{ maxWidth: `${useWindowSize()}px` }}>
            {pokemon_array((useWindowSize().width - 50) / 150).map(
              (deffencePokemonList) => {
                return (
                  <TableRow
                    key={deffencePokemonList
                      .map((p) => {
                        return p.base.name_ja;
                      })
                      .join("")}
                  >
                    {deffencePokemonList.map((deffencePokemon) => {
                      return (
                        <TableCell style={{ background: "" }}>
                          {deffencePokemon.base.picture_url ? (
                            <img
                              src={deffencePokemon.base.picture_url}
                              width={55}
                              height={55}
                            ></img>
                          ) : (
                            <>
                              <div>{deffencePokemon.base.name_ja}</div>
                            </>
                          )}
                          <div>
                            {calc_interface({
                              offencePokemonList,
                              deffencePokemon: deffencePokemon,
                              deffenceDummyPokemon,
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

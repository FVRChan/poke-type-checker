import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { calc_interface } from "./calc_damage";
import { Pokemon, pokemon_array, PokemonDefenceInterface, PokemonOffenceInterface } from "./pokemon";
import { useWindowSize } from "./useWindowSize";

function Body({
  offencePokemonList,
  deffenceDummyPokemon,
}: {
  offencePokemonList: PokemonOffenceInterface[];
  deffenceDummyPokemon: PokemonDefenceInterface;
}) {
  return (
    <>
      <TableContainer style={{ width: "95%" }}>
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
                            maxWidth: "65px",
                            maxHeight: "65px",
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

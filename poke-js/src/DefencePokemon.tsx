import Effort from "./Effort";
import { Pokemon } from "./pokemon";

// index もダミー
function DefencePokemon({
  deffenceDummyPokemon,
  setDeffenceDummyPokemon,
  index = 0,
}: {
  deffenceDummyPokemon: Pokemon;
  setDeffenceDummyPokemon: (i: number, p: Pokemon) => void;
  index?: number;
}) {
  return (
    <>
      <Effort
        pokemon={deffenceDummyPokemon}
        pokemonSetter={setDeffenceDummyPokemon}
        isOffense={false}
        isDefense
        index={index}
      />
    </>
  );
}
export default DefencePokemon;

import Effort from "./Effort";
import { Pokemon } from "./pokemon";

function DefencePokemon({
  deffenceDummyPokemon,
  setDeffenceDummyPokemon,
}: {
  deffenceDummyPokemon: Pokemon;
  setDeffenceDummyPokemon: React.Dispatch<React.SetStateAction<Pokemon>>;
}) {
  return (
    <>
      <h2>守備側</h2>
      <Effort
        pokemon={deffenceDummyPokemon}
        pokemonSetter={setDeffenceDummyPokemon}
        isOffense={false}
        isDefense
      />
    </>
  );
}
export default DefencePokemon;

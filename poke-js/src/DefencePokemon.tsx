import {  PokemonDefenceInterface } from "./pokemon";
import DeffenceEffort from "./DefenceEffort";
import { TerastalSelect } from "./TerastalSelect";
import { DefenceItem } from "./DefenceItem";

// index もダミー
function DefencePokemon({
  deffenceDummyPokemon,
  setDeffenceDummyPokemon,
  index = 0,
}: {
  deffenceDummyPokemon: PokemonDefenceInterface;
  setDeffenceDummyPokemon: (i: number, p: PokemonDefenceInterface) => void;
  index?: number;
}) {
  return (
    <>
      <DeffenceEffort
        pokemon={deffenceDummyPokemon}
        pokemonSetter={setDeffenceDummyPokemon}
        index={index}
      />
      <TerastalSelect
        pokemon={deffenceDummyPokemon}
        setPokemon={setDeffenceDummyPokemon}
        index={index}
      ></TerastalSelect>
      <DefenceItem
        pokemon={deffenceDummyPokemon}
        setPokemon={setDeffenceDummyPokemon}
        index={index}
      ></DefenceItem>
    </>
  );
}
export default DefencePokemon;

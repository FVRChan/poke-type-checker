import { copiedDummyInfoForDefencePokemon } from "./calc-damage/calc_damage";
import { PokemonDefenceInterface } from "./pokemon";

export function ShowEffortValue({
  deffencePokemon,
  deffenceDummyPokemon,
}: {
  deffencePokemon: PokemonDefenceInterface;
  deffenceDummyPokemon: PokemonDefenceInterface;
}) {
  const showPokemon = copiedDummyInfoForDefencePokemon({
    deffencePokemon,
    deffenceDummyPokemon,
  });
  return (
    <ul>
      <li>{showPokemon.effective_value.hp}</li>
      <li>{showPokemon.effective_value.defense}</li>
      <li>{showPokemon.effective_value.special_defense}</li>
    </ul>
  );
}

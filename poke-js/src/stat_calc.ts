import { PokemonOffenceInterface, PokemonDefenceInterface } from "./pokemon";

/**
 * レベル50個体値31前提で種族値と努力値を加味したH実数値を計算する
 */
export function calcRealValueHPStat(
  pokemon: PokemonOffenceInterface | PokemonDefenceInterface
) {
  return 75 + pokemon.pokemon.hp + pokemon.effective_slider_step.hp;
}

export function calcRealValueAttackOffencePokemon(
  pokemon: PokemonOffenceInterface
) {
  let ev = 20 + pokemon.pokemon.attack + pokemon.effective_slider_step.attack;
  ev *= pokemon.personality.attack;
  ev = Math.floor(ev);
  return ev;
}

export function calcRealValueSpecialAttackOffencePokemon(
  pokemon: PokemonOffenceInterface
) {
  let ev =
    20 +
    pokemon.pokemon.special_attack +
    pokemon.effective_slider_step.special_attack;
  ev *= pokemon.personality.special_attack;
  ev = Math.floor(ev);
  return ev;
}

export function calcRealValueDeffenceOffencePokemon(
  pokemon: PokemonOffenceInterface
) {
  let ev = 20 + pokemon.pokemon.defense + pokemon.effective_slider_step.defense;
  ev *= pokemon.personality.defense;
  ev = Math.floor(ev);
  return ev;
}

export function calcRealValueSpecialDeffenceOffencePokemon(
  pokemon: PokemonOffenceInterface
) {
  let ev =
    20 +
    pokemon.pokemon.special_defense +
    pokemon.effective_slider_step.special_defense;
  ev *= pokemon.personality.special_defense;
  ev = Math.floor(ev);
  return ev;
}

export function calcRealValueAttackDefencePokemon(
  pokemon: PokemonDefenceInterface
) {
  let ev = 20 + pokemon.pokemon.attack + pokemon.effective_slider_step.attack;
  ev *= pokemon.personality.attack;
  ev = Math.floor(ev);
  return ev;
}

export function calcRealValueSpecialAttackDefencePokemon(
  pokemon: PokemonDefenceInterface
) {
  let ev =
    20 +
    pokemon.pokemon.special_attack +
    pokemon.effective_slider_step.special_attack;
  ev *= pokemon.personality.special_attack;
  ev = Math.floor(ev);
  return ev;
}

export function calcRealValueDeffenceDefencePokemon(
  pokemon: PokemonDefenceInterface
) {
  let ev = 20 + pokemon.pokemon.defense + pokemon.effective_slider_step.defense;
  ev *= pokemon.personality.defense;
  ev = Math.floor(ev);

  return ev;
}

export function calcRealValueSpecialDeffenceDefencePokemon(
  pokemon: PokemonDefenceInterface
) {
  let ev =
    20 +
    pokemon.pokemon.special_defense +
    pokemon.effective_slider_step.special_defense;
  ev *= pokemon.personality.special_defense;
  ev = Math.floor(ev);
  return ev;
}

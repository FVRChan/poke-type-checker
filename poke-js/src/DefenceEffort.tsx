import React from "react";
import EffortSlider from "./EffortSlider";
import { Pokemon, PokemonDefenceInterface } from "./pokemon";
import { MOVE_DAMAGE_CLASS_PHYSICAL, MOVE_DAMAGE_CLASS_SPECIAL } from "./move";
import { PersonalityRate } from "./calc_damage";

export default function DeffenceEffort({
  pokemon,
  pokemonSetter,
  // isOffense,
  // isDefense,
  index,
}: {
  pokemon: PokemonDefenceInterface;
  pokemonSetter: (i: number, p: PokemonDefenceInterface) => void;
  // isOffense: boolean;
  // isDefense: boolean;
  index: number;
}) {
  const [effortStepHP, setEffortStepHP] = React.useState<number>(
    pokemon.effective_slider_step.hp
  );
  const [effortStepAttack, setEffortStepAttack] = React.useState<number>(
    pokemon.effective_slider_step.attack
  );
  const [effortStepDeffence, setEffortStepDeffence] = React.useState<number>(
    pokemon.effective_slider_step.defense
  );
  const [effortStepSpecialAttack, setEffortStepSpecialAttack] =
    React.useState<number>(pokemon.effective_slider_step.special_attack);
  const [effortStepSpecialDeffence, setEffortStepSpecialDeffence] =
    React.useState<number>(pokemon.effective_slider_step.special_defense);
  const handleSetPokemonEffortStepHP = (newValue: number) => {
    setEffortStepHP(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.hp = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPokemonEffortStepAttack = (newValue: number) => {
    setEffortStepAttack(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.attack = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPokemonEffortStepDeffence = (newValue: number) => {
    setEffortStepDeffence(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.defense = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPokemonEffortStepSpecialAttack = (newValue: number) => {
    setEffortStepSpecialAttack(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.special_attack = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPokemonEffortStepSpecialDeffence = (newValue: number) => {
    setEffortStepSpecialDeffence(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.special_defense = newValue;
    pokemonSetter(index, temp);
  };
  const [personalityAttack, setPersonalityAttack] =
    React.useState<PersonalityRate>(pokemon.personality.attack);
  const [personalityDeffence, setPersonalityDeffence] =
    React.useState<PersonalityRate>(pokemon.personality.defense);
  const [personalitySpecialAttack, setPersonalitySpecialAttack] =
    React.useState<PersonalityRate>(pokemon.personality.special_attack);
  const [personalitySpecialDeffence, setPersonalitySpecialDeffence] =
    React.useState<PersonalityRate>(pokemon.personality.special_defense);
  const handleSetPersonalityAttack = (newValue: PersonalityRate) => {
    setPersonalityAttack(newValue);
    const temp = { ...pokemon };
    temp.personality.attack = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPersonalityDeffence = (newValue: PersonalityRate) => {
    setPersonalityDeffence(newValue);
    const temp = { ...pokemon };
    temp.personality.defense = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPersonalitySpecialAttack = (newValue: PersonalityRate) => {
    setPersonalitySpecialAttack(newValue);
    const temp = { ...pokemon };
    temp.personality.special_attack = newValue;
    pokemonSetter(index, temp);
  };
  const handleSetPersonalitySpecialDeffence = (newValue: PersonalityRate) => {
    setPersonalitySpecialDeffence(newValue);
    const temp = { ...pokemon };
    temp.personality.special_defense = newValue;
    pokemonSetter(index, temp);
  };
  return (
    <>
      {
        <EffortSlider
          label={"HP"}
          step={effortStepHP}
          stepSetter={handleSetPokemonEffortStepHP}
        ></EffortSlider>
      }
      {/* {isOffense &&
        pokemon.selected_move &&
        pokemon.selected_move.damage_class_number ===
          MOVE_DAMAGE_CLASS_PHYSICAL && (
          <EffortSlider
            label={"攻撃"}
            step={effortStepAttack}
            stepSetter={handleSetPokemonEffortStepAttack}
            personality={personalityAttack}
            personalitySetter={handleSetPersonalityAttack}
          ></EffortSlider>
        )} */}
      {
        <EffortSlider
          label={"防御"}
          step={effortStepDeffence}
          stepSetter={handleSetPokemonEffortStepDeffence}
          personality={personalityDeffence}
          personalitySetter={handleSetPersonalityDeffence}
        ></EffortSlider>
      }
      {/* {isOffense &&
        pokemon.selected_move &&
        pokemon.selected_move.damage_class_number ===
          MOVE_DAMAGE_CLASS_SPECIAL && (
          <EffortSlider
            label={"特攻"}
            step={effortStepSpecialAttack}
            stepSetter={handleSetPokemonEffortStepSpecialAttack}
            personality={personalitySpecialAttack}
            personalitySetter={handleSetPersonalitySpecialAttack}
          ></EffortSlider>
        )} */}
      {
        <EffortSlider
          label={"特防"}
          step={effortStepSpecialDeffence}
          stepSetter={handleSetPokemonEffortStepSpecialDeffence}
          personality={personalitySpecialDeffence}
          personalitySetter={handleSetPersonalitySpecialDeffence}
        ></EffortSlider>
      }
    </>
  );
}
export interface Effort {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

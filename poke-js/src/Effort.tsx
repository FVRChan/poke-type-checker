import React from "react";
import EffortSlider from "./EffortSlider";
import { Pokemon } from "./pokemon-list";

export default function Effort({
  pokemon,
  pokemonSetter,
}: {
  pokemon: Pokemon;
  pokemonSetter: (p: Pokemon) => void;
}) {
  const [effortStepHP, setEffortStepHP] = React.useState<number>(pokemon.effective_slider_step.hp);
  const [effortStepAttack, setEffortStepAttack] = React.useState<number>(pokemon.effective_slider_step.attack);
  const [effortStepDeffence, setEffortStepDeffence] = React.useState<number>(pokemon.effective_slider_step.defense);
  const [effortStepSpecialAttack, setEffortStepSpecialAttack] = React.useState<number>(pokemon.effective_slider_step.special_attack);
  const [effortStepSpecialDeffence, setEffortStepSpecialDeffence] = React.useState<number>(pokemon.effective_slider_step.special_defense);
  const handleSetPokemonEffortStepHP = (newValue: number) => {
    setEffortStepHP(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.hp = newValue;
    pokemonSetter(temp);
  };
  const handleSetPokemonEffortStepAttack = (newValue: number) => {
    setEffortStepAttack(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.attack = newValue;
    pokemonSetter(temp);
  };
  const handleSetPokemonEffortStepDeffence = (newValue: number) => {
    setEffortStepDeffence(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.defense = newValue;
    pokemonSetter(temp);
  };
  const handleSetPokemonEffortStepSpecialAttack = (newValue: number) => {
    setEffortStepSpecialAttack(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.special_attack = newValue;
    pokemonSetter(temp);
  };
  const handleSetPokemonEffortStepSpecialDeffence = (newValue: number) => {
    setEffortStepSpecialDeffence(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.special_defense = newValue;
    pokemonSetter(temp);
  };
  const [personalityAttack, setPersonalityAttack] = React.useState<0.9 | 1.0 | 1.1>(pokemon.personality.attack);
  const [personalityDeffence, setPersonalityDeffence] = React.useState<0.9 | 1.0 | 1.1>(pokemon.personality.defense);
  const [personalitySpecialAttack, setPersonalitySpecialAttack] = React.useState<0.9 | 1.0 | 1.1>(pokemon.personality.special_attack);
  const [personalitySpecialDeffence, setPersonalitySpecialDeffence] = React.useState<0.9 | 1.0 | 1.1>(pokemon.personality.special_defense);
  const handleSetPersonalityAttack=(newValue:0.9|1.0|1.1)=>{
    setPersonalityAttack(newValue)
    const temp={...pokemon};
    temp.personality.attack=newValue
    pokemonSetter(temp)
  }
  const handleSetPersonalityDeffence=(newValue:0.9|1.0|1.1)=>{
    setPersonalityDeffence(newValue)
    const temp={...pokemon};
    temp.personality.defense=newValue
    pokemonSetter(temp)
  }
  const handleSetPersonalitySpecialAttack=(newValue:0.9|1.0|1.1)=>{
    setPersonalitySpecialAttack(newValue)
    const temp={...pokemon};
    temp.personality.special_attack=newValue
    pokemonSetter(temp)
  }
  const handleSetPersonalitySpecialDeffence=(newValue:0.9|1.0|1.1)=>{
    setPersonalitySpecialDeffence(newValue)
    const temp={...pokemon};
    temp.personality.special_defense=newValue
    pokemonSetter(temp)
  }
  return (
    <>
      <EffortSlider
        label={"HP"}
        step={effortStepHP}
        stepSetter={handleSetPokemonEffortStepHP}
      ></EffortSlider>
      <EffortSlider
        label={"攻撃"}
        step={effortStepAttack}
        stepSetter={handleSetPokemonEffortStepAttack}
        personality={personalityAttack}
        personalitySetter={handleSetPersonalityAttack}
      ></EffortSlider>
      <EffortSlider
        label={"防御"}
        step={effortStepDeffence}
        stepSetter={handleSetPokemonEffortStepDeffence}
        personality={personalityDeffence}
        personalitySetter={handleSetPersonalityDeffence}
      ></EffortSlider>
      <EffortSlider
        label={"特攻"}
        step={effortStepSpecialAttack}
        stepSetter={handleSetPokemonEffortStepSpecialAttack}
        personality={personalitySpecialAttack}
        personalitySetter={handleSetPersonalitySpecialAttack}
      ></EffortSlider>
      <EffortSlider
        label={"特防"}
        step={effortStepSpecialDeffence}
        stepSetter={handleSetPokemonEffortStepSpecialDeffence}
        personality={personalitySpecialDeffence}
        personalitySetter={handleSetPersonalitySpecialDeffence}
      ></EffortSlider>
    </>
  );
}

import React from "react";

import { Grid, MenuItem, Select } from "@mui/material";
import { PersonalityRate } from "../calc_damage";
import EffortSlider from "../EffortSlider";
import { MOVE_DAMAGE_CLASS_PHYSICAL, MOVE_DAMAGE_CLASS_SPECIAL } from "../move";
import { PokemonOffenceInterface, rankCorrectionEnum, rankCorrectionEnumList } from "../pokemon";

export default function OffenceEffort({
  pokemon,
  pokemonSetter,
  index,
}: {
  pokemon: PokemonOffenceInterface;
  pokemonSetter: (i: number, p: PokemonOffenceInterface) => void;
  index: number;
}) {
  /*
  const [effortStepHP, setEffortStepHP] = React.useState<number>(
    pokemon.effective_slider_step.hp
  );
  const [effortStepDeffence, setEffortStepDeffence] = React.useState<number>(
    pokemon.effective_slider_step.defense
  );
  const [effortStepSpecialDeffence, setEffortStepSpecialDeffence] =
    React.useState<number>(pokemon.effective_slider_step.special_defense);

  const handleSetPokemonEffortStepHP = (newValue: number) => {
    setEffortStepHP(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.hp = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const handleSetPokemonEffortStepDeffence = (newValue: number) => {
    setEffortStepDeffence(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.defense = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const handleSetPokemonEffortStepSpecialDeffence = (newValue: number) => {
    setEffortStepSpecialDeffence(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.special_defense = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const [personalityDeffence, setPersonalityDeffence] =
    React.useState<PersonalityRate>(pokemon.personality.defense);

  const [personalitySpecialDeffence, setPersonalitySpecialDeffence] =
    React.useState<PersonalityRate>(pokemon.personality.special_defense);

  const handleSetPersonalityDeffence = (newValue: PersonalityRate) => {
    setPersonalityDeffence(newValue);
    const temp = { ...pokemon };
    temp.personality.defense = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const handleSetPersonalitySpecialDeffence = (newValue: PersonalityRate) => {
    setPersonalitySpecialDeffence(newValue);
    const temp = { ...pokemon };
    temp.personality.special_defense = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };
  */

  const [effortStepAttack, setEffortStepAttack] = React.useState<number>(
    pokemon.effective_slider_step.attack
  );
  const [effortStepSpecialAttack, setEffortStepSpecialAttack] =
    React.useState<number>(pokemon.effective_slider_step.special_attack);

  const handleSetPokemonEffortStepAttack = (newValue: number) => {
    setEffortStepAttack(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.attack = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };
  const handleSetPokemonEffortStepSpecialAttack = (newValue: number) => {
    setEffortStepSpecialAttack(newValue);
    const temp = { ...pokemon };
    temp.effective_slider_step.special_attack = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };
  const [personalityAttack, setPersonalityAttack] =
    React.useState<PersonalityRate>(pokemon.personality.attack);

  const [personalitySpecialAttack, setPersonalitySpecialAttack] =
    React.useState<PersonalityRate>(pokemon.personality.special_attack);

  const handleSetPersonalityAttack = (newValue: PersonalityRate) => {
    setPersonalityAttack(newValue);
    const temp = { ...pokemon };
    temp.personality.attack = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const handleSetPersonalitySpecialAttack = (newValue: PersonalityRate) => {
    setPersonalitySpecialAttack(newValue);
    const temp = { ...pokemon };
    temp.personality.special_attack = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const [rankCorrectionAttack, setRankCorrectionAttack] =
    React.useState<rankCorrectionEnum>(pokemon.rankCorrection.attack);
  const [rankCorrectionSpecialAttack, setRankCorrectionSpecialAttack] =
    React.useState<rankCorrectionEnum>(pokemon.rankCorrection.special_attack);
  const handleSetRankCorrectionAttack = (newValue: rankCorrectionEnum) => {
    setRankCorrectionAttack(newValue);
    const temp = { ...pokemon };
    temp.rankCorrection.attack = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  const handleSetRankCorrectionSpecialAttack = (
    newValue: rankCorrectionEnum
  ) => {
    setRankCorrectionSpecialAttack(newValue);
    const temp = { ...pokemon };
    temp.rankCorrection.special_attack = newValue;
    pokemonSetter(index, JSON.parse(JSON.stringify(temp)));
  };

  return (
    <>
      {/* {isDefense && (
        <EffortSlider
          label={"HP"}
          step={effortStepHP}
          stepSetter={handleSetPokemonEffortStepHP}
        ></EffortSlider>
      )} */}
      {pokemon.selected_move &&
        pokemon.selected_move.damage_class_number ===
          MOVE_DAMAGE_CLASS_PHYSICAL && (
          <Grid container>
            <Grid item xs={11}>
              <EffortSlider
                label={"攻撃"}
                step={effortStepAttack}
                stepSetter={handleSetPokemonEffortStepAttack}
                personality={personalityAttack}
                personalitySetter={handleSetPersonalityAttack}
              ></EffortSlider>
            </Grid>
            <Grid item xs={1}>
              <Select
                onChange={(e) => {
                  if (typeof e.target.value === "string") {
                  } else {
                    handleSetRankCorrectionAttack(e.target.value);
                  }
                }}
                size="small"
                defaultValue={pokemon.rankCorrection.attack}
                value={pokemon.rankCorrection.attack}
              >
                {rankCorrectionEnumList.map((h) => {
                  return <MenuItem value={h}>{h}</MenuItem>;
                })}
              </Select>
            </Grid>
          </Grid>
        )}
      {/* {isDefense && (
        <EffortSlider
          label={"防御"}
          step={effortStepDeffence}
          stepSetter={handleSetPokemonEffortStepDeffence}
          personality={personalityDeffence}
          personalitySetter={handleSetPersonalityDeffence}
        ></EffortSlider>
      )} */}
      {pokemon.selected_move &&
        pokemon.selected_move.damage_class_number ===
          MOVE_DAMAGE_CLASS_SPECIAL && (
          <Grid container>
            <Grid item xs={11}>
              <EffortSlider
                label={"特攻"}
                step={effortStepSpecialAttack}
                stepSetter={handleSetPokemonEffortStepSpecialAttack}
                personality={personalitySpecialAttack}
                personalitySetter={handleSetPersonalitySpecialAttack}
              ></EffortSlider>
            </Grid>
            <Grid item xs={1}>
              <Select
                onChange={(e) => {
                  if (typeof e.target.value === "string") {
                  } else {
                    handleSetRankCorrectionSpecialAttack(e.target.value);
                  }
                }}
                size="small"
                defaultValue={pokemon.rankCorrection.special_attack}
                value={pokemon.rankCorrection.special_attack}
              >
                {rankCorrectionEnumList.map((h) => {
                  return <MenuItem value={h}>{h}</MenuItem>;
                })}
              </Select>
            </Grid>
          </Grid>
        )}
      {/* {isDefense && (
        <EffortSlider
          label={"特防"}
          step={effortStepSpecialDeffence}
          stepSetter={handleSetPokemonEffortStepSpecialDeffence}
          personality={personalitySpecialDeffence}
          personalitySetter={handleSetPersonalitySpecialDeffence}
        ></EffortSlider> 
      )}*/}
    </>
  );
}
export interface OffenceEffort {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

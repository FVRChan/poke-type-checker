import React from "react";
import { typeCheckerI } from "./interface";

export default function useViewModel() {
  const [isTokuseiConsideration, setTokuseiConsideration] =
    React.useState<boolean>(false);
  const [typeChecker, setTypeChecker] = React.useState<typeCheckerI>({
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    psychic: false,
    ice: false,
    freezedry: false,
    dragon: false,
    dark: false,
    fairy: false,
  });
  const [isKimo, setKimo] = React.useState<boolean>(false);
  return {
    isTokuseiConsideration,
    setTokuseiConsideration,
    typeChecker,
    setTypeChecker,
    isKimo,
    setKimo,
  };
}

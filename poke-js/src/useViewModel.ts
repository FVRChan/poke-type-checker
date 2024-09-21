import React from "react";
import { dummyPokemon, Pokemon, pokemon_list } from "./pokemon";

// 負けた気はするがとりあえず行ける
function copyPokemon(p: Pokemon): Pokemon {
  return JSON.parse(JSON.stringify(p));
}
export function useViewModel() {
  // スマフォ用のメニューオープンフラグ
  const [smartphoneDrawerOpen, setSmartphoneDrawerOpen] = React.useState(false);
  const togglesmartphoneDrawerOpen = () => {
    setSmartphoneDrawerOpen(!smartphoneDrawerOpen);
  };
  // 

  const [offencePokemonList, setOffencePokemonList] = React.useState<Pokemon[]>(
    [copyPokemon(pokemon_list[0])]
  );
  const handleAddOffencePokemonList = () => {
    const temp = offencePokemonList;
    temp.splice(temp.length, 0, copyPokemon(pokemon_list[0]));
    setOffencePokemonList([...temp]);
  };
  const handleRemoveOffencePokemonList = (i: number) => {
    const temp = offencePokemonList;
    temp.splice(i, 1);
    setOffencePokemonList([...temp]);
  };
  const handleSaveOffencePokemonList = (i: number, p: Pokemon) => {
    const temp = offencePokemonList;
    temp.splice(i, 1, p);
    setOffencePokemonList([...temp]);
  };
  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<Pokemon>(dummyPokemon);
  const handleSaveDeffenceDummyPokemon = (i: number, p: Pokemon) => {
    setDeffenceDummyPokemon((prev) => ({ ...prev }));
  };

  return {
    smartphoneDrawerOpen,
    togglesmartphoneDrawerOpen,
    offencePokemonList,
    setOffencePokemonList,
    handleAddOffencePokemonList,
    handleRemoveOffencePokemonList,
    handleSaveOffencePokemonList,
    deffenceDummyPokemon,
    setDeffenceDummyPokemon,
    handleSaveDeffenceDummyPokemon,
  };
}

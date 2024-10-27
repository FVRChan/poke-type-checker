import React from "react";
import {
  dummyPokemon,
  Pokemon,
  pokemon_list,
  PokemonDefenceInterface,
  PokemonOffenceInterface,
  toOffence,
} from "./pokemon";
import { otherSetting } from "./OtherSetting";
import { BATTLE_FIELD_EMPTY, WEATHER_EMPTY } from "./other_setting";

// 負けた気はするがとりあえず行ける
// function copyPokemon(p: Pokemon): Pokemon {
//   return JSON.parse(JSON.stringify(p));
// }
function copyPokemonToOffence(p: Pokemon): PokemonOffenceInterface {
  return toOffence(JSON.parse(JSON.stringify(p)));
}
export function useViewModel() {
  // スマフォ用のメニューオープンフラグ
  const [smartphoneDrawerOpen, setSmartphoneDrawerOpen] = React.useState(false);
  const togglesmartphoneDrawerOpen = () => {
    setSmartphoneDrawerOpen(!smartphoneDrawerOpen);
  };
  //

  const [offencePokemonList, setOffencePokemonList] = React.useState<
    PokemonOffenceInterface[]
  >([copyPokemonToOffence(pokemon_list[0])]);

  const handleAddOffencePokemonList = () => {
    const temp = offencePokemonList;
    temp.splice(
      temp.length,
      0,
      JSON.parse(
        JSON.stringify(offencePokemonList[offencePokemonList.length - 1])
      )
    );
    setOffencePokemonList([...temp]);
  };
  // const handleAddOffencePokemonList = () => {
  //   const temp = offencePokemonList;
  //   temp.splice(temp.length, 0, copyPokemonToOffence(pokemon_list[0]));
  //   setOffencePokemonList([...temp]);
  // };

  const handleRemoveOffencePokemonList = (i: number) => {
    const temp = offencePokemonList;
    temp.splice(i, 1);
    setOffencePokemonList([...temp]);
  };
  const handleSaveOffencePokemonList = (
    i: number,
    p: PokemonOffenceInterface
  ) => {
    const temp = offencePokemonList;
    temp.splice(i, 1, p);
    setOffencePokemonList([...temp]);
  };

  const [deffenceDummyPokemon, setDeffenceDummyPokemon] =
    React.useState<PokemonDefenceInterface>(dummyPokemon);
  const handleSaveDeffenceDummyPokemon = (
    i: number,
    p: PokemonDefenceInterface
  ) => {
    setDeffenceDummyPokemon((prev) => ({ ...prev }));
  };

  const [otherSetting, setOtherSetting] = React.useState<otherSetting>({
    battle_field: BATTLE_FIELD_EMPTY,
    weather: WEATHER_EMPTY,
  } as otherSetting);

  const handleSaveOtherSetting = (os: otherSetting) => {
    setOtherSetting((perv) => ({ ...os }));
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
    otherSetting,
    handleSaveOtherSetting,
  };
}

import React from "react";
import { Pokemon, typeCheckerI } from "./interface";
import { useCookies } from "react-cookie";
import { pokemon_array } from "./pokemon-list";

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
  const [isIromegane, setIromegane] = React.useState<boolean>(false);
  const [selectedMyPokeList, setSelectedMyPokeList] = React.useState<Pokemon[]>(
    []
  );
  const [selectedAitePokeList, setSelectedAitePokeList] = React.useState<
    Pokemon[]
  >([]);

  // https://zenn.dev/kenghaya/articles/6020b6192dadec 🙇🙇🙇
  // 端末幅次第で1行あたりに表示するポケモンの数の変更(動的なのでスマフォの縦横変化やPCWindowsサイズ変更などが対応できている)
  const useWindowSize = (): { width: number } => {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
      const updateSize = (): void => {
        // console.log(window.innerWidth, window.innerHeight,window.outerWidth, window.outerHeight)
        setSize([window.innerWidth, window.innerHeight]);
        // setSize([window.outerWidth, window.outerHeight]);
      };

      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return {
      width: size[0],
    };
  };

  const [cookies, setCookies, removeCookies] = useCookies([
    "sp1",
    "sp2",
    "sp3",
    "sp4",
    "sp5",
    "sp6",
  ]);
  // 範囲指定orマッピングみたいにしたほうがいいかもしれない...?
  const localPokemonMatrix = pokemon_array(
    Math.ceil((useWindowSize().width-50) / 100)
  );

  // falseなら自分のを選ぶ
  const [selectPokemonSwitch, setSelectPokemonSwitch] =
    // React.useState<boolean>(false); 
    React.useState<boolean>(true); // 開発のため

  return {
    isTokuseiConsideration,
    setTokuseiConsideration,
    typeChecker,
    setTypeChecker,
    isKimo,
    setKimo,
    isIromegane,
    setIromegane,
    // useWindowSize,
    cookies,
    setCookies,
    removeCookies,
    selectedMyPokeList,
    setSelectedMyPokeList,
    localPokemonMatrix,
    selectPokemonSwitch,
    setSelectPokemonSwitch,
    selectedAitePokeList,
    setSelectedAitePokeList,
  };
}

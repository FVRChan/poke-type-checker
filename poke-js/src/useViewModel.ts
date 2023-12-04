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
  const [isIromegane, setIromegane] = React.useState<boolean>(false);

  // https://zenn.dev/kenghaya/articles/6020b6192dadec 🙇🙇🙇
  // 端末幅次第で1行あたりに表示するポケモンの数の変更(動的なのでスマフォの縦横変化やPCWindowsサイズ変更などが対応できている)
  const useWindowSize = (): { width: number } => {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
      const updateSize = (): void => {
        setSize([window.innerWidth, window.innerHeight]);
      };

      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return {
      width: size[0],
    };
  };

  return {
    isTokuseiConsideration,
    setTokuseiConsideration,
    typeChecker,
    setTypeChecker,
    isKimo,
    setKimo,
    isIromegane,
    setIromegane,
    useWindowSize,
  };
}

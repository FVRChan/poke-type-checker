import React from "react";
// https://zenn.dev/kenghaya/articles/6020b6192dadec 🙇🙇🙇
// 端末幅次第で1行あたりに表示するポケモンの数の変更(動的なのでスマフォの縦横変化やPCWindowsサイズ変更などが対応できている)
export const useWindowSize = (): { width: number } => {
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

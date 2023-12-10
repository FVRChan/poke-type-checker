import React, { useRef } from "react";
import {
  Switch,
  Button,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Grid,
} from "@mui/material";
import { pokemon_list } from "./pokemon-list";
import type_map from "./type-map";
import TypeChecker from "./TypeChecker";
import {
  allow_color_map,
  color_map,
  cookiePokemon,
  tokusei_map,
} from "./const";
import useViewModel from "./useViewModel";
import {
  typeCheckerI,
  Pokemon,
  selectedPokemonCookieKey,
  PokemonMove,
} from "./interface";
import OptionChecker from "./OptionChecker";
import MyPoke from "./MyPoke";
import AitePoke from "./AitePoke";
import LeaderLine from "leader-line-new";
import { pokemon_move_list } from "./pokemon-moves";

export default function App() {
  const {
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
    // localKengaiPokemonMatrix,
    selectPokemonSwitch,
    setSelectPokemonSwitch,
    selectedAitePokeList,
    setSelectedAitePokeList,
  } = useViewModel();
  const handleSetSelectedAitePokeList = (poke: Pokemon) => {
    const localAitePokeList = JSON.parse(JSON.stringify(selectedAitePokeList));
    if (localAitePokeList.length < 6) {
      localAitePokeList.push(poke);
      setSelectedAitePokeList(localAitePokeList);
    }
  };

  const [lineList, setLineList] = React.useState<LeaderLine[]>([]);

  const handleSetSelectedMyPokeList = (poke: Pokemon) => {
    if (
      selectedMyPokeList.length > 5 ||
      selectedMyPokeList.filter((v) => {
        return v.pokedex === poke.pokedex;
      }).length > 0
    ) {
      return;
    }
    const spl = JSON.parse(JSON.stringify(selectedMyPokeList));
    spl.push(poke);
    setSelectedMyPokeList(spl);
    if (selectedMyPokeList.length === 0) {
      writeCookie("sp1", poke);
    } else if (selectedMyPokeList.length === 1) {
      writeCookie("sp2", poke);
    } else if (selectedMyPokeList.length === 2) {
      writeCookie("sp3", poke);
    } else if (selectedMyPokeList.length === 3) {
      writeCookie("sp4", poke);
    } else if (selectedMyPokeList.length === 4) {
      writeCookie("sp5", poke);
    } else if (selectedMyPokeList.length === 5) {
      writeCookie("sp6", poke);
    }
  };

  const toCookiePokemon = (argPoke: Pokemon): cookiePokemon => {
    return {
      pokemon_id: argPoke.pokemon_id,
      move1: argPoke.sm1,
      move2: argPoke.sm2,
      move3: argPoke.sm3,
      move4: argPoke.sm4,
      showMovelist: argPoke.showMovelist,
    } as cookiePokemon;
  };
  const fromCookiePokemon = (argPoke: cookiePokemon): Pokemon | undefined => {
    const t = pokemon_list.find((v) => {
      return v.pokemon_id === argPoke.pokemon_id;
    });
    if (t) {
      t.sm1 = argPoke.move1;
      t.sm2 = argPoke.move2;
      t.sm3 = argPoke.move3;
      t.sm4 = argPoke.move4;
      t.showMovelist = argPoke.showMovelist;
    }
    return t;
  };
  const writeCookie = (key: selectedPokemonCookieKey, argPoke: Pokemon) => {
    setCookies(key, toCookiePokemon(argPoke));
  };
  const readCookie = (key: selectedPokemonCookieKey): Pokemon | undefined => {
    return fromCookiePokemon(cookies[key]);
  };

  const resetSelectedMyPokeList = () => {
    setSelectedMyPokeList([]);
    removeCookies("sp1");
    removeCookies("sp2");
    removeCookies("sp3");
    removeCookies("sp4");
    removeCookies("sp5");
    removeCookies("sp6");
  };
  const resetLineList = () => {
    lineList.forEach((l) => {
      l.remove();
    });
    setLineList([]);
  };
  const resetSelectedAitePokeList = () => {
    setSelectedAitePokeList([]);
    resetLineList();
  };

  // 開いたらcookieから読み込む
  React.useEffect(() => {
    const init_list = [] as Pokemon[];
    if (cookies["sp1"] !== undefined) {
      const t = readCookie("sp1");
      if (t) {
        init_list.push(t);
      }
    }
    if (cookies["sp2"] !== undefined) {
      const t = readCookie("sp2");
      if (t) {
        init_list.push(t);
      }
    }
    if (cookies["sp3"] !== undefined) {
      const t = readCookie("sp3");
      if (t) {
        init_list.push(t);
      }
    }
    if (cookies["sp4"] !== undefined) {
      const t = readCookie("sp4");
      if (t) {
        init_list.push(t);
      }
    }
    if (cookies["sp5"] !== undefined) {
      const t = readCookie("sp5");
      if (t) {
        init_list.push(t);
      }
    }
    if (cookies["sp6"] !== undefined) {
      const t = readCookie("sp6");
      if (t) {
        init_list.push(t);
      }
    }
    setSelectedMyPokeList(init_list);
  }, []);

  const typeCalc = (poke: Pokemon, at: string): number => {
    let res = 1;
    const r1 = type_map[poke.pokemon_type1_en].damage_relations;
    if (r1.double_damage_from.includes(at)) {
      res *= 2.0;
    } else if (
      (at === "normal" || at === "fighting") &&
      isKimo &&
      (r1.no_damage_to.includes("normal") ||
        r1.no_damage_to.includes("fighting"))
    ) {
      res *= 1;
    } else if (r1.half_damage_from.includes(at)) {
      res *= 0.5;
    } else if (r1.no_damage_from.includes(at)) {
      res *= 0;
    }
    if (poke.pokemon_type2_en !== "") {
      const r2 = type_map[poke.pokemon_type2_en].damage_relations;
      if (r2.double_damage_from.includes(at)) {
        res *= 2.0;
      } else if (
        (at === "normal" || at === "fighting") &&
        isKimo &&
        (r2.no_damage_to.includes("normal") ||
          r2.no_damage_to.includes("fighting"))
      ) {
        res *= 1;
      } else if (r2.half_damage_from.includes(at)) {
        res *= 0.5;
      } else if (r2.no_damage_from.includes(at)) {
        res *= 0;
      }
    }

    // ふしぎなまもり(内定するのかしら)
    // TODO : 攻め条件
    // ノーマルスキン

    if (isIromegane && [0.25, 0.5].includes(res)) {
      res *= 2;
    }

    if (isTokuseiConsideration) {
      ([poke.tokusei1, poke.tokusei2, poke.tokusei3] as Array<string>).map(
        (t) => {
          if (
            Object.keys(tokusei_map).indexOf(t) >= 0 &&
            tokusei_map[t][at] !== undefined
          ) {
            res *= tokusei_map[t][at];
          }
        }
      );
    }

    return res;
  };

  const handleSetTypeChecker = (tc: typeCheckerI) => {
    setTypeChecker(tc);
  };

  const calcMyToAite = (myPoke: Pokemon, aitePoke: Pokemon): number => {
    const retList = [] as number[];
    if (myPoke.sm1) {
      retList.push(typeCalc(aitePoke, myPoke.sm1.type_en));
    }
    if (myPoke.sm2) {
      retList.push(typeCalc(aitePoke, myPoke.sm2.type_en));
    }
    if (myPoke.sm3) {
      retList.push(typeCalc(aitePoke, myPoke.sm3.type_en));
    }
    if (myPoke.sm4) {
      retList.push(typeCalc(aitePoke, myPoke.sm4.type_en));
    }
    return Math.max(...retList);
  };

  React.useEffect(() => {
    resetLineList();
    const ttl = [] as LeaderLine[];
    selectedMyPokeList.map((myPoke, i) => {
      selectedAitePokeList.map((aitePoke, j) => {
        const myRef = document.getElementById(`mypoke${i}`); // TODO : バニラじゃなくてちゃんとReactしたい
        const aiteRef = document.getElementById(`aitepoke${j}`); // TODO : バニラじゃなくてちゃんとReactしたい
        const ret = calcMyToAite(myPoke, aitePoke);
        if (myRef && aiteRef && ret > 1) {
          const t = new LeaderLine(myRef, aiteRef, {
            color: allow_color_map[ret],
            path: "straight",
            startSocket: "right",
            endSocket: "left",
          });
          ttl.push(t);
        }
      });
    });
    setLineList(ttl);
  }, [selectedMyPokeList, selectedAitePokeList]);

  const handlerSetShowMoveList = (i: number) => {
    const tpl = JSON.parse(JSON.stringify(selectedMyPokeList)) as Pokemon[];
    const tp = tpl[i];
    tp.showMovelist = !tp.showMovelist;
    tpl[i] = tp;
    setSelectedMyPokeList(tpl);
    const cookieKey = `sp${i + 1}` as selectedPokemonCookieKey;
    writeCookie(cookieKey, tp);
  };

  const handleChangeMyPokemonMove = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number,
    jjj: number
  ) => {
    const pm = pokemon_move_list.find(
      (dddd) => dddd.id === Number(e.target.value)
    ) as PokemonMove | undefined;
    const cookieKey = `sp${i + 1}` as selectedPokemonCookieKey;
    const cp = readCookie(cookieKey);

    const spl = JSON.parse(JSON.stringify(selectedMyPokeList)) as Pokemon[];
    const targetPoke = spl[i];

    if (cp) {
      if (jjj === 1) {
        cp.sm1 = pm;
        targetPoke.sm1 = pm;
      } else if (jjj === 2) {
        cp.sm2 = pm;
        targetPoke.sm2 = pm;
      } else if (jjj === 3) {
        cp.sm3 = pm;
        targetPoke.sm3 = pm;
      } else if (jjj === 4) {
        cp.sm4 = pm;
        targetPoke.sm4 = pm;
      }
      writeCookie(cookieKey, cp);
    }
    spl[i] = targetPoke;
    setSelectedMyPokeList(spl);
  };

  const [showRemoveMyPokeButton, setRemoveMyPokeButton] =
    React.useState<boolean>(false);

  return (
    <div className="App">
      <div>
        <h2>タイプ</h2>
        <TypeChecker
          typeChecker={typeChecker}
          setTypeChecker={handleSetTypeChecker}
        ></TypeChecker>
      </div>
      <div>
        <h4>オプション</h4>
        <OptionChecker
          isTokuseiConsideration={isTokuseiConsideration}
          setTokuseiConsideration={setTokuseiConsideration}
          isKimo={isKimo}
          setKimo={setKimo}
          isIromegane={isIromegane}
          setIromegane={setIromegane}
        ></OptionChecker>
      </div>

      {/* <div>
        <h2>選出</h2>
        <Grid container spacing={2} style={{ marginLeft: "20px" }}>
          <Grid xs={5}>
            {selectedMyPokeList.map((poke, i) => {
              return (
                <div>
                  <MyPoke
                    poke={poke}
                    i={i}
                    handlerSetShowMoveList={handlerSetShowMoveList}
                    handleChangeMyPokemonMove={handleChangeMyPokemonMove}
                  ></MyPoke>
                </div>
              );
            })}
            {showRemoveMyPokeButton &&
              selectedMyPokeList &&
              selectedMyPokeList.length > 0 && (
                <Button
                  onClick={resetSelectedMyPokeList}
                  style={{ background: "lightblue" }}
                >
                  初期化
                </Button>
              )}
          </Grid>
          <Grid xs={4}></Grid>
          <Grid xs={1}>
            {selectedAitePokeList.map((poke, i) => {
              return <AitePoke poke={poke} i={i}></AitePoke>;
            })}
            {selectedAitePokeList && selectedAitePokeList.length > 0 && (
              <Button
                onClick={resetSelectedAitePokeList}
                style={{ background: "lightblue" }}
              >
                初期化
              </Button>
            )}
          </Grid>
        </Grid>
      </div> */}

      <div>
        <h2>ポケモン選択</h2>※手動による暫定の使用率順
        {/* <div>
          <label>
            自分
            <Switch
              defaultChecked={selectPokemonSwitch}
              onChange={() => {
                setSelectPokemonSwitch(!selectPokemonSwitch);
              }}
              color="secondary"
            />
            相手
          </label>
        </div> */}
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {localPokemonMatrix.map((list) => {
                return (
                  <TableRow>
                    {list.map((poke) => {
                      const checkedTypeList = Object.keys(typeChecker).filter(
                        (v) => typeChecker[v]
                      );
                      const type_res_list = checkedTypeList.map((v) =>
                        typeCalc(poke, v)
                      );
                      const bgcolor = color_map[Math.max(...type_res_list)];

                      return (
                        <TableCell
                          style={{ width: "100px", background: bgcolor }}
                          onClick={() => {
                            if (!selectPokemonSwitch) {
                              handleSetSelectedMyPokeList(poke);
                            } else {
                              handleSetSelectedAitePokeList(poke);
                            }
                          }}
                        >
                          {poke.front_picture ? (
                            <img
                              src={poke.front_picture}
                              width={50}
                              height={50}
                            ></img>
                          ) : (
                            <>
                              <div>{poke.pokemon_name}</div>
                              <div>
                                {poke.pokemon_type1_ja}
                                {poke.pokemon_type2_ja && (
                                  <>/{poke.pokemon_type2_ja}</>
                                )}
                              </div>
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {false && (
          <div>
            <div>使用率150位圏外</div>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  {localKengaiPokemonMatrix.map((list) => {
                    return (
                      <TableRow>
                        {list.map((poke) => {
                          const checkedTypeList = Object.keys(
                            typeChecker
                          ).filter((v) => typeChecker[v]);
                          const type_res_list = checkedTypeList.map((v) =>
                            typeCalc(poke, v)
                          );
                          const bgcolor = color_map[Math.max(...type_res_list)];

                          return (
                            <TableCell
                              style={{ width: "100px", background: bgcolor }}
                              onClick={() => {
                                if (!selectPokemonSwitch) {
                                  handleSetSelectedMyPokeList(poke);
                                } else {
                                  handleSetSelectedAitePokeList(poke);
                                }
                              }}
                            >
                              {poke.front_picture ? (
                                <img
                                  src={poke.front_picture}
                                  width={50}
                                  height={50}
                                ></img>
                              ) : (
                                <>
                                  <div>{poke.pokemon_name}</div>
                                  <div>
                                    {poke.pokemon_type1_ja}
                                    {poke.pokemon_type2_ja && (
                                      <>/{poke.pokemon_type2_ja}</>
                                    )}
                                  </div>
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )} */}
      </div>

      {/* <div>
        <label>
          <Switch
            defaultChecked={showRemoveMyPokeButton}
            onChange={() => {
              setRemoveMyPokeButton(!showRemoveMyPokeButton);
            }}
            color="secondary"
          />
          自分初期化ボタン表示
        </label>
      </div> */}
    </div>
  );
}

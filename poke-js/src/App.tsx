import React from "react";
import {
  Button,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { pokemon_array, pokemon_list } from "./pokemon-list";
import type_map from "./type-map";
import TypeChecker from "./TypeChecker";
import { color_map, cookiePokemon, tokusei_map } from "./const";
import useViewModel from "./useViewModel";
import { typeCheckerI, Pokemon, PokemonMove } from "./interface";
import { useCookies } from "react-cookie";
import { pokemon_move_list } from "./pokemon-moves";

export default function App() {
  const [cookies, setCookies, removeCookies] = useCookies([
    "sp1",
    "sp2",
    "sp3",
    "sp4",
    "sp5",
    "sp6",
  ]);
  const [] = React.useState();
  const {
    isTokuseiConsideration,
    setTokuseiConsideration,
    typeChecker,
    setTypeChecker,
    isKimo,
    setKimo,
    isIromegane,
    setIromegane,
    useWindowSize,
  } = useViewModel();
  const [selectedPokeList, setSelectedPokeList] = React.useState<Pokemon[]>([]);
  const handleSetSelectedPokeList = (poke: Pokemon) => {
    if (
      selectedPokeList.length > 5 ||
      selectedPokeList.filter((v) => {
        return v.pokedex === poke.pokedex;
      }).length > 0
    ) {
      return;
    }
    const spl = JSON.parse(JSON.stringify(selectedPokeList));
    spl.push(poke);
    setSelectedPokeList(spl);
    if (selectedPokeList.length === 0) {
      writeCookie("sp1", poke);
    } else if (selectedPokeList.length === 1) {
      writeCookie("sp2", poke);
    } else if (selectedPokeList.length === 2) {
      writeCookie("sp3", poke);
    } else if (selectedPokeList.length === 3) {
      writeCookie("sp4", poke);
    } else if (selectedPokeList.length === 4) {
      writeCookie("sp5", poke);
    } else if (selectedPokeList.length === 5) {
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
  const writeCookie = (
    key: "sp1" | "sp2" | "sp3" | "sp4" | "sp5" | "sp6",
    argPoke: Pokemon
  ) => {
    setCookies(key, toCookiePokemon(argPoke));
  };
  const readCookie = (
    key: "sp1" | "sp2" | "sp3" | "sp4" | "sp5" | "sp6"
  ): Pokemon | undefined => {
    return fromCookiePokemon(cookies[key]);
  };

  const resetSelectedPokeList = () => {
    setSelectedPokeList([]);
    removeCookies("sp1");
    removeCookies("sp2");
    removeCookies("sp3");
    removeCookies("sp4");
    removeCookies("sp5");
    removeCookies("sp6");
  };
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
    setSelectedPokeList(init_list);
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

  const local_pokemon_matrix = pokemon_array(
    Math.ceil(useWindowSize().width / 100)
  );
  const handleSetTypeChecker = (tc: typeCheckerI) => {
    setTypeChecker(tc);
  };
  const uketokuDetail = Object.keys(tokusei_map).join(", ");

  const getMove = (poke: Pokemon, num: number): PokemonMove | undefined => {
    if (num === 1) {
      return poke.sm1;
    }
    if (num === 2) {
      return poke.sm2;
    }
    if (num === 3) {
      return poke.sm3;
    }
    if (num === 4) {
      return poke.sm4;
    }
    return undefined;
  };

  return (
    <div className="App">
      <div>
        <h2>タイプ</h2>
        <TypeChecker
          typeChecker={typeChecker}
          setTypeChecker={handleSetTypeChecker}
        ></TypeChecker>
      </div>
      {true && (
        <>
          <div>
            <h4>オプション</h4>
          </div>

          <Tooltip title={uketokuDetail} arrow>
            <FormControlLabel
              control={
                <Checkbox
                  value={isTokuseiConsideration}
                  onChange={() => {
                    setTokuseiConsideration(!isTokuseiConsideration);
                  }}
                />
              }
              label="受け特性考慮"
            />
          </Tooltip>
          <FormControlLabel
            control={
              <Checkbox
                value={isKimo}
                onChange={() => {
                  setKimo(!isKimo);
                }}
              />
            }
            label="きもったま/しんがん"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={isIromegane}
                onChange={() => {
                  setIromegane(!isIromegane);
                }}
              />
            }
            label="いろめがね"
          />
        </>
      )}
      <div>
        <h2>選出</h2>
        {selectedPokeList && selectedPokeList.length > 0 && (
          <Button
            onClick={resetSelectedPokeList}
            style={{ background: "lightblue" }}
          >
            初期化
          </Button>
        )}
        {selectedPokeList.map((poke, i) => {
          return (
            <div>
              <div>
                {poke.front_picture ? (
                  <img
                    onClick={() => {
                      const tpl = JSON.parse(
                        JSON.stringify(selectedPokeList)
                      ) as Pokemon[];
                      const tp = tpl[i];
                      tp.showMovelist = !tp.showMovelist;
                      tpl[i] = tp;
                      setSelectedPokeList(tpl);
                      const cookieKey = `sp${i + 1}` as
                        | "sp1"
                        | "sp2"
                        | "sp3"
                        | "sp4"
                        | "sp5"
                        | "sp6";
                      writeCookie(cookieKey, tp);
                    }}
                    src={poke.front_picture}
                    width={50}
                    height={50}
                  ></img>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        const tpl = JSON.parse(
                          JSON.stringify(selectedPokeList)
                        ) as Pokemon[];
                        const tp = tpl[i];
                        tp.showMovelist = !tp.showMovelist;
                        tpl[i] = tp;
                        setSelectedPokeList(tpl);
                        const cookieKey = `sp${i + 1}` as
                          | "sp1"
                          | "sp2"
                          | "sp3"
                          | "sp4"
                          | "sp5"
                          | "sp6";
                        writeCookie(cookieKey, tp);
                      }}
                    >
                      {poke.pokemon_name}
                    </div>
                    <div>
                      {poke.pokemon_type1_ja}
                      {poke.pokemon_type2_ja && <>/{poke.pokemon_type2_ja}</>}
                    </div>
                  </>
                )}
              </div>
              {poke.showMovelist && (
                <div>
                  <div>
                    {[1, 2, 3, 4].map((jjj) => {
                      return (
                        <div>
                          <select
                            onChange={(e) => {
                              const pm = pokemon_move_list.find(
                                (dddd) => dddd.id === Number(e.target.value)
                              ) as PokemonMove | undefined;
                              const cookieKey = `sp${i + 1}` as
                                | "sp1"
                                | "sp2"
                                | "sp3"
                                | "sp4"
                                | "sp5"
                                | "sp6";
                              const cp = readCookie(cookieKey);

                              if (cp && pm) {
                                // cp.sm1=pm?.id
                                if (jjj === 1) {
                                  cp.sm1 = pm;
                                } else if (jjj === 2) {
                                  cp.sm2 = pm;
                                } else if (jjj === 3) {
                                  cp.sm3 = pm;
                                } else if (jjj === 4) {
                                  cp.sm4 = pm;
                                }
                                writeCookie(cookieKey, cp);
                              }
                            }}
                          >
                            {poke.moves.map((pm) => {
                              return (
                                <option
                                  value={pm.id}
                                  selected={getMove(poke, jjj)?.id === pm.id}
                                >
                                  {pm.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <h2>ポケモン表</h2>※手動による暫定の使用率順
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {local_pokemon_matrix.map((list) => {
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
                            handleSetSelectedPokeList(poke);
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
      {/* 使うか微妙なためコメントアウト */}
      {/* {false && (
        <div>
          <h2>相性表</h2>
          
        </div>
      )}
      {false && (
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>画像</TableCell>
                <TableCell>タイプ</TableCell>
                {Object.keys(type_en_to_kanji).map((t) => {
                  return (
                    <TableCell
                      onClick={(e) => {
                        const tc = JSON.parse(JSON.stringify(typeChecker));
                        tc[t] = !tc[t];
                        setTypeChecker(tc);
                      }}
                      key={t}
                    >
                      {type_en_to_kanji[t]}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemon_list.map((pokemon) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>
                      {pokemon.front_picture ? (
                        <img
                          src={pokemon.front_picture}
                          width={75}
                          height={75}
                        ></img>
                      ) : (
                        <>
                          <div>{pokemon.pokemon_name}</div>
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        {pokemon.pokemon_type1_ja}/{pokemon.pokemon_type2_ja}
                      </div>
                    </TableCell>
                    {Object.keys(type_en_to_ja).map((t) => {
                      const temp = typeCalc(pokemon, t);
                      const bgcolor = "lightyellow";
                      return (
                        <TableCell style={{ backgroundColor: bgcolor }} key={t}>
                          {temp}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )} */}
    </div>
  );
}

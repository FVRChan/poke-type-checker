import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  FormControlLabel,
  Checkbox,Tooltip,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import pokemon_list, { pokemon_array, Pokemon } from "./pokemon-list";
import type_map from "./type-map";
import TypeChecker from "./TypeChecker";
import { tokusei_map, type_en_to_ja, type_en_to_kanji } from "./const";
import useViewModel from "./useViewModel";
import { typeCheckerI } from "./interface";
const useStyles = makeStyles(() => ({
  pictureColumn: {
    width: "1px",
  },
  typeColumn: {
    width: "1px",
  },
}));
interface i_color_map {
  [index: number]: string;
}
interface i_effect_num_map{
  [index:number]:number;
}
const color_map = {
  4: "gold",
  2: "khaki",
  1: "",
  0.5: "lightgray",
  0.25: "darkgray",
  0: "dimgray",
} as i_color_map;
// 特性
// 特性を考慮するかみたいな条件を入れる

// https://zenn.dev/kenghaya/articles/6020b6192dadec 🙇🙇🙇
const useWindowSize = (): number[] => {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default function App() {
  const classes = useStyles();

  const {
    isTokuseiConsideration,
setTokuseiConsideration,
typeChecker,
setTypeChecker,
  }=useViewModel()

  // const [effect_num_map,set_effect_num_map] = React.useState<i_effect_num_map>({
  //   4:0,
  //   2:0,
  //   1:0,
  //   0.5:0,
  //   0.25:0,
  //   0:0,
  // })
  // const reset_effect_num_map=()=>{
  //   set_effect_num_map({
  //     4:0,
  //     2:0,
  //     1:0,
  //     0.5:0,
  //     0.25:0,
  //     0:0,
  //   })
  // }

  const typeCalc = (poke: Pokemon, at: string): number => {
    
    let res = 1;
    const r1 = type_map[poke.pokemon_type1_en].damage_relations;
    if (r1.double_damage_from.includes(at)) {
      res *= 2.0;
    } else if (r1.half_damage_from.includes(at)) {
      res *= 0.5;
    } else if (r1.no_damage_from.includes(at)) {
      res *= 0;
    }
    if (poke.pokemon_type2_en !== "") {
      const r2 = type_map[poke.pokemon_type2_en].damage_relations;
      if (r2.double_damage_from.includes(at)) {
        res *= 2.0;
      } else if (r2.half_damage_from.includes(at)) {
        res *= 0.5;
      } else if (r2.no_damage_from.includes(at)) {
        res *= 0;
      }
    }

    // ふしぎなまもり(内定するのかしら)
    // TODO : 攻め条件
    // きもったま/しんがん/ノーマルスキン

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

    // const enm = JSON.parse(JSON.stringify(effect_num_map));
    // enm[res]++;
    // set_effect_num_map(enm);

    // console.log(enm)

    return res;
  };

  const local_pokemon_matrix = pokemon_array(
    Math.ceil(useWindowSize()[0] / 100)
  );
const handleSetTypeChecker=(tc:typeCheckerI)=>{
  // reset_effect_num_map()
  setTypeChecker(tc)
}
 const takashi=Object.keys(tokusei_map).join(", ")
  return (
    <div className="App">
      <div>
        <h2>タイプ</h2>
        <TypeChecker
          typeChecker={typeChecker}
          // setTypeChecker={setTypeChecker}
          setTypeChecker={handleSetTypeChecker}
        ></TypeChecker>
      </div>
      {true && (
        <>
          <div>
            <h2>オプション</h2>
          </div>
          
          <Tooltip title={takashi} arrow>
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
          /></Tooltip>
        </>
      )}
      <div>
        <h2>ポケモン表</h2>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {/* 課題(TODO) => 横幅を動的にしたい*/}
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
      {false && (
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
                {/* {typeCheckNode()} */}
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
                      {type_en_to_kanji [t]}
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
      )}
    </div>
  );
}

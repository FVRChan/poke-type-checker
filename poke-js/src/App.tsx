import React from "react";
import { pokemon_array } from "./pokemon-list";
import  type_map  from "./type-map";
import {
  Table,
  TableContainer,
  // TableHead,
  TableRow,
  TableBody,
  TableCell,
  // FormControlLabel,
  // Checkbox,
} from "@mui/material";
export default function App() {
  return (
    <div className="App">
      <div>
        <h2>ポケモン表</h2>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {pokemon_array.map((list) => {
                return (
                  <TableRow>
                    {list.map((poke) => {
                      return (
                        <TableCell style={{ background: "" }}>
                          {poke.base.picture_url ? (
                            <img
                              src={poke.base.picture_url}
                              width={75}
                              height={75}
                            ></img>
                          ) : (
                            <>
                              <div>{poke.base.name_ja}</div>
                            </>
                          )}
                          <div>
                            {kakutei(
                              poke.base.hp + 75,
                              100,
                              204,//(カイリュー特化数値) poke.base.attack + 20,
                              poke.base.deffense + 20,
                              5,poke.base.type_id_list
                            )}
                          </div>
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
    </div>
  );
}


function kakutei(
  hp: number,
  power: number,
  attack: number,
  deffence: number,
  offenceType:number,deffenceTypeList:number[]
): string {
  const typeRate=typeWWWW(offenceType,deffenceTypeList)
  const calcedList = calcWithRand(power, attack, deffence,typeRate);
  const maxDamage = Math.max(...calcedList);
  const minDamage = Math.min(...calcedList);
  const counter = calcedList
    .map((v) => {
      return hp - v < 0;
    })
    .filter((v) => v);
  if (counter.length === calcedList.length) {
    return `確定1発(${minDamage}~${maxDamage})`;
  }
  return `計算失敗(${minDamage}~${maxDamage})`;
}
function calcWithRand(
  power: number,
  attack: number,
  deffence: number,typeRate:number,
): Array<number> {
  const base = calc({ power, attack, deffence,typeRate });
  const retList = [] as Array<number>;
  for (let loop = 0.85; loop <= 1.0; loop += 0.01) {
    retList.push(Math.floor(base * loop));
  }
  return retList;
}
function calc({
  power,
  attack,
  deffence,typeRate,
}: {
  power: number;
  attack: number;
  deffence: number;
  typeRate:number;
}) {
  let a=(((50 * 2/5 + 2) * power * attack/deffence) / 50 + 2)
  a*=typeRate
  return a
}



function typeWWWW(offenceType:number,deffenceTypeList:number[]){
  let res=1.0;
  const deffenceType1=deffenceTypeList[0]
  const r1=type_map[deffenceType1].damage_relations
  if (r1.double_damage_from.includes(offenceType)) {
    res *= 2.0;
  } else if (r1.half_damage_from.includes(offenceType)) {
    res *= 0.5;
  } else if (r1.no_damage_from.includes(offenceType)) {
    res *= 0;
  }
  if (deffenceTypeList.length===2) {
    const deffenceType2=deffenceTypeList[1]
    const r2 = type_map[deffenceType2].damage_relations;
    if (r2.double_damage_from.includes(offenceType)) {
      res *= 2.0;
    } else if (r2.half_damage_from.includes(offenceType)) {
      res *= 0.5;
    } else if (r2.no_damage_from.includes(offenceType)) {
      res *= 0;
    }
  }  
  return res
}
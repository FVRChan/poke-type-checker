import React from "react";
import { pokemon_array } from "./pokemon-list";
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
function calcWithRand(power:number,attack:number,deffence:number):Array<number>{
  const base=calc({power,attack,deffence})
  const retList=[] as Array<number>
  for (let loop=0.85;loop<=1.00;loop+=0.01){
    retList.push(Math.floor(base*loop))
  }
  return retList
}
function calc({power,attack,deffence}:{power:number,attack:number,deffence:number}){
  return (22*power*(attack/deffence))*1/50+2
}

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

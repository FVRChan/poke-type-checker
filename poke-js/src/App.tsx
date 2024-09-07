import React from "react";
import { pokemon_list, pokemon_array, Pokemon } from "./pokemon-list";
import type_map from "./type-map";
import move_list, { Move } from "./move";
import {
  Table,
  TableContainer,
  // TableHead,
  TableRow,
  TableBody,
  TableCell,
  Autocomplete,
  TextField,
  Slider,
  Grid,
  Stack,
  // FormControlLabel,
  // Checkbox,
} from "@mui/material";
import EffortSlider from "./EffortSlider";
// 努力値計算(SliderのStep設定に苦戦した)
function calcEffort(step:number):number{
  if (step === 0) {
    return 0;
  } else if (step === 1) {
    return 4;
  }
  return 4 + (step - 1) * 8;
}
export default function App() {
  const [offencePokemon, setOffencePokemon] = React.useState<Pokemon>(
    pokemon_list[0]
  );
  const [offenceMove, setOffenceMove] = React.useState<Move>(move_list[0]);
  const [effortStepHP, setEffortStepHP] = React.useState<number>(0);
  const [effortStepAttack, setEffortStepAttack] = React.useState<number>(0);
  const [effortStepDeffence, setEffortStepDeffence] = React.useState<number>(0);
  const [effortStepSpecialAttack, setEffortStepSpecialAttack] = React.useState<number>(0);
  const [effortStepSpecialDeffence, setEffortStepSpecialDeffence] = React.useState<number>(0);
  // const effortHP = React.useMemo(() => {return calcEffort(effortStepHP)}, [effortStepHP]);
  // const effortAttack = React.useMemo(() => {return calcEffort(effortStepAttack)}, [effortStepAttack]);
  // const effortDeffence = React.useMemo(() => {return calcEffort(effortStepDeffence)}, [effortStepDeffence]);
  // const effortSpecialAttack = React.useMemo(() => {return calcEffort(effortStepSpecialAttack)}, [effortStepSpecialAttack]);
  // const effortSpecialDeffence = React.useMemo(() => {return calcEffort(effortStepSpecialDeffence)}, [effortStepSpecialDeffence]);
  return (
    <div className="App">
      <div>
        <Grid container spacing={2}>
          <Grid>
            <Autocomplete
              value={offencePokemon}
              onChange={(_, p) => {
                if (p) {
                  setOffencePokemon(p);
                }
              }}
              disablePortal
              options={pokemon_list}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(p) => p.base.name_ja}
            />
            A{offencePokemon.base.attack}, C{offencePokemon.base.special_attack}
          </Grid>
          <Grid>
            <Autocomplete
              value={offenceMove}
              onChange={(_, m) => {
                if (m) {
                  setOffenceMove(m);
                }
              }}
              disablePortal
              options={move_list}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(m) => m.name_ja}
            />
            威力{offenceMove.power}({offenceMove.type})
          </Grid>
        </Grid>
        <Grid
          container
          direction={"column"}
          style={{ width: "400px", marginLeft: "10px" }}
        >
          <EffortSlider label={"HP"}step={effortStepHP} stepSetter={setEffortStepHP}></EffortSlider>
          <EffortSlider label={"攻撃"}step={effortStepAttack} stepSetter={setEffortStepAttack}></EffortSlider>
          <EffortSlider label={"防御"}step={effortStepDeffence} stepSetter={setEffortStepDeffence}></EffortSlider>
          <EffortSlider label={"特攻"}step={effortStepSpecialAttack} stepSetter={setEffortStepSpecialAttack}></EffortSlider>
          <EffortSlider label={"特防"}step={effortStepSpecialDeffence} stepSetter={setEffortStepSpecialDeffence}></EffortSlider>
        </Grid>
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
                              calcRealValueHPStat(poke.base.hp,effortStepHP),// poke.base.hp + 75,
                              offenceMove.power,
                              calcRealValueOtherStat(offencePokemon.base.attack,effortStepAttack),
                              calcRealValueOtherStat(poke.base.deffense,effortStepDeffence),
                              offenceMove.type,
                              poke.base.type_id_list
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
  offenceType: number,
  deffenceTypeList: number[]
): string {
  const typeRate = typeWWWW(offenceType, deffenceTypeList);
  const calcedList = calcWithRand(power, attack, deffence, typeRate);
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
  deffence: number,
  typeRate: number
): Array<number> {
  const base = calc({ power, attack, deffence, typeRate });
  const retList = [] as Array<number>;
  for (let loop = 0.85; loop <= 1.0; loop += 0.01) {
    retList.push(Math.floor(base * loop));
  }
  return retList;
}
function calc({
  power,
  attack,
  deffence,
  typeRate,
}: {
  power: number;
  attack: number;
  deffence: number;
  typeRate: number;
}) {
  let a = (((50 * 2) / 5 + 2) * power * attack) / deffence / 50 + 2;
  a *= typeRate;
  return a;
}

function typeWWWW(offenceType: number, deffenceTypeList: number[]) {
  let res = 1.0;
  const deffenceType1 = deffenceTypeList[0];
  const r1 = type_map[deffenceType1].damage_relations;
  if (r1.double_damage_from.includes(offenceType)) {
    res *= 2.0;
  } else if (r1.half_damage_from.includes(offenceType)) {
    res *= 0.5;
  } else if (r1.no_damage_from.includes(offenceType)) {
    res *= 0;
  }
  if (deffenceTypeList.length === 2) {
    const deffenceType2 = deffenceTypeList[1];
    const r2 = type_map[deffenceType2].damage_relations;
    if (r2.double_damage_from.includes(offenceType)) {
      res *= 2.0;
    } else if (r2.half_damage_from.includes(offenceType)) {
      res *= 0.5;
    } else if (r2.no_damage_from.includes(offenceType)) {
      res *= 0;
    }
  }
  return res;
}

// 個体値31前提で計算している
function calcRealValueOtherStat(b:number,es:number){
return 20+b+es
}
function calcRealValueHPStat(b:number,es:number){
  return 75+b+es
}
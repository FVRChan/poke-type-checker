import { Select, MenuItem, Checkbox } from "@mui/material";
import { Pokemon } from "./pokemon";
import { type_id_to_hiraganakatakana, type_id_to_kanji } from "./type-map";
import DeffenceEffort from "./DefenceEffort";

// index もダミー
function DefencePokemon({
  deffenceDummyPokemon,
  setDeffenceDummyPokemon,
  index = 0,
}: {
  deffenceDummyPokemon: Pokemon;
  setDeffenceDummyPokemon: (i: number, p: Pokemon) => void;
  index?: number;
}) {
  const tempArray = () => {
    const retList: number[] = [];
    for (let i = 1; i <= 18; i++) {
      retList.push(i);
    }
    return retList;
  };
  return (
    <>
      <DeffenceEffort
        pokemon={deffenceDummyPokemon}
        pokemonSetter={setDeffenceDummyPokemon}
        // isOffense={false}
        // isDefense
        index={index}
      />
      <Select
        defaultValue={0}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={deffenceDummyPokemon.terasu_type}
        label="Age"
        onChange={(e) => {
          const tempPokemon = deffenceDummyPokemon;
          tempPokemon.terasu_type = e.target.value as number;
          setDeffenceDummyPokemon(index, tempPokemon);
        }}
      >
        <MenuItem value={0} selected>
          なし
        </MenuItem>
        {tempArray().map((v, i) => {
          return (
            <MenuItem value={i + 1}>
              {type_id_to_hiraganakatakana(i + 1)}
            </MenuItem>
          );
        })}
      </Select>
      {/* 特性<Checkbox value={deffenceDummyPokemon.adapt_deffence_ability} onChange={()=>{
        const temp=deffenceDummyPokemon
        temp.adapt_deffence_ability=!temp.adapt_deffence_ability
        setDeffenceDummyPokemon(index,temp)
      }} /> */}
    </>
  );
}
export default DefencePokemon;

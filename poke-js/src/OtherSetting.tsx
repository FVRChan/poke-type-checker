import { Checkbox, MenuItem, Select } from "@mui/material";
import { WEATHER_EMPTY, WEATHER_HARE, WEATHER_AME, WEATHER_SUNA, WEATHER_YUKI, BATTLE_FIELD_EMPTY, BATTLE_FIELD_PSYCHO_SAIKO, BATTLE_FIELD_EREKI, BATTLE_FIELD_MISUTO, BATTLE_FIELD_GLASS } from "./other_setting";

function OtherSetting() {
  return (
    <>
      <Select
        size="small"
        // value={pokemon.selected_defencete_item_rate_id}
        // defaultValue={DEFENCE_ITEM_ID_NO_SET}
        placeholder="アイテムを選択"
        label="アイテムを選択"
        // onChange={(e) => {
        //   const tempPokemon = pokemon;
        //   tempPokemon.selected_defencete_item_rate_id = e.target.value as number;
        //   setPokemon(index, tempPokemon);
        // }}
      >
      <MenuItem value={WEATHER_EMPTY} selected>なし</MenuItem>
      <MenuItem value={WEATHER_HARE} selected>はれ</MenuItem>
      <MenuItem value={WEATHER_AME} selected>あめ</MenuItem>
      <MenuItem value={WEATHER_SUNA} selected>すな</MenuItem>
      <MenuItem value={WEATHER_YUKI} selected>ゆき</MenuItem>
        {/* <MenuItem value={DEFENCE_ITEM_ID_NO_SET} selected>
        なし
      </MenuItem>
      <MenuItem value={DEFENCE_ITEM_ID_ASSAULT_VEST}>とつげきチョッキ</MenuItem>
      <MenuItem value={DEFENCE_ITEM_ID_SINKANOKISEKI}>しんかのきせき</MenuItem> */}
      </Select>
      <Select
        size="small"
        // value={pokemon.selected_defencete_item_rate_id}
        // defaultValue={DEFENCE_ITEM_ID_NO_SET}
        placeholder="アイテムを選択"
        label="アイテムを選択"
        // onChange={(e) => {
        //   const tempPokemon = pokemon;
        //   tempPokemon.selected_defencete_item_rate_id = e.target.value as number;
        //   setPokemon(index, tempPokemon);
        // }}
      >
      <MenuItem value={BATTLE_FIELD_EMPTY} selected>なし</MenuItem>
      <MenuItem value={BATTLE_FIELD_PSYCHO_SAIKO} selected>サイコフィールド</MenuItem>
      <MenuItem value={BATTLE_FIELD_EREKI} selected>エレキフィールド</MenuItem>
      <MenuItem value={BATTLE_FIELD_MISUTO} selected>ミスとフィールド</MenuItem>
      <MenuItem value={BATTLE_FIELD_GLASS} selected>グラスフィールド</MenuItem>
        {/* <MenuItem value={DEFENCE_ITEM_ID_NO_SET} selected>
        なし
      </MenuItem>
      <MenuItem value={DEFENCE_ITEM_ID_ASSAULT_VEST}>とつげきチョッキ</MenuItem>
      <MenuItem value={DEFENCE_ITEM_ID_SINKANOKISEKI}>しんかのきせき</MenuItem> */}
      </Select>
    </>
  );
}
export default OtherSetting;

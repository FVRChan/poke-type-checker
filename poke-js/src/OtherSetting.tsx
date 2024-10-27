import { Checkbox, MenuItem, Select } from "@mui/material";
import {
  WEATHER_EMPTY,
  WEATHER_HARE,
  WEATHER_AME,
  WEATHER_SUNA,
  WEATHER_YUKI,
  BATTLE_FIELD_EMPTY,
  BATTLE_FIELD_PSYCHO_SAIKO,
  BATTLE_FIELD_EREKI,
  BATTLE_FIELD_MISUTO,
  BATTLE_FIELD_GLASS,
  battle_field,
  weather,
} from "./other_setting";
export interface otherSetting {
  weather: weather;
  battle_field: battle_field;
}
function OtherSetting({
  otherSetting,
  handleSaveOtherSetting,
}: {
  otherSetting: otherSetting;
  handleSaveOtherSetting: (v: otherSetting) => void;
}) {
  return (
    <>
      <Select
        size="small"
        value={otherSetting.weather}
        placeholder="アイテムを選択"
        label="アイテムを選択"
        onChange={(e) => {
          const wwww = otherSetting;
          wwww.weather = e.target.value as number;
          handleSaveOtherSetting(wwww);
        }}
      >
        <MenuItem value={WEATHER_EMPTY} selected>
          なし
        </MenuItem>
        <MenuItem value={WEATHER_HARE}>はれ</MenuItem>
        <MenuItem value={WEATHER_AME}>あめ</MenuItem>
        <MenuItem value={WEATHER_SUNA}>すな</MenuItem>
        <MenuItem value={WEATHER_YUKI}>ゆき</MenuItem>
      </Select>
      <Select
        size="small"
        value={otherSetting.battle_field}
        placeholder="アイテムを選択"
        label="アイテムを選択"
        onChange={(e) => {
          const wwww = otherSetting;
          wwww.battle_field = e.target.value as number;
          handleSaveOtherSetting(wwww);
        }}
      >
        <MenuItem value={BATTLE_FIELD_EMPTY} selected>
          なし
        </MenuItem>
        <MenuItem value={BATTLE_FIELD_PSYCHO_SAIKO}>サイコフィールド</MenuItem>
        <MenuItem value={BATTLE_FIELD_EREKI}>エレキフィールド</MenuItem>
        <MenuItem value={BATTLE_FIELD_MISUTO}>ミストフィールド</MenuItem>
        <MenuItem value={BATTLE_FIELD_GLASS}>グラスフィールド</MenuItem>
      </Select>
    </>
  );
}
export default OtherSetting;

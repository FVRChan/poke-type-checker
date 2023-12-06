import React from "react";
import { FormControlLabel, Checkbox, Tooltip } from "@mui/material";
import { tokusei_map } from "./const";

export default function OptionChecker({
  isTokuseiConsideration,
  setTokuseiConsideration,
  isKimo,
  setKimo,
  isIromegane,
  setIromegane,
}: {
  isTokuseiConsideration: boolean;
  setTokuseiConsideration: (b: boolean) => void;
  isKimo: boolean;
  setKimo: (b: boolean) => void;
  isIromegane: boolean;
  setIromegane: (b: boolean) => void;
}) {
  return (
    <div>
      <Tooltip title={Object.keys(tokusei_map).join(", ")} arrow>
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
    </div>
  );
}

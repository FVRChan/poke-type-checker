import React from "react";
// import {South} from '@mui/icons-material';
import { Button, MenuItem, Select, Slider, Stack } from "@mui/material";
import { calcEffort } from "./util";
import { PersonalityRate } from "./calc_damage";
export default function EffortSlider({
  label,
  step,
  stepSetter,
  personality,
  personalitySetter,
}: {
  label: string;
  step: number;
  stepSetter: (newValue: number) => void;
  personality?: PersonalityRate;
  personalitySetter?: (newValue: PersonalityRate) => void;
}) {
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{ alignItems: "center", mb: 1 }}
        style={{ marginLeft: "10px" }}
      >
        <div>{label}</div>
        {label !== "HP" && personalitySetter && personality && (
          <>
            <Select
              value={personality}
              size="small"
              defaultValue={personality}
              onChange={(e) => {
                const next =
                  typeof e.target.value === "string"
                    ? parseInt(e.target.value)
                    : e.target.value;
                personalitySetter(next as PersonalityRate);
              }}
            >
              <MenuItem value={0.9}>0.9</MenuItem>
              <MenuItem value={1.0}>1.0</MenuItem>
              <MenuItem value={1.1}>1.1</MenuItem>
            </Select>
          </>
        )}
        <Slider
          onChange={(_, v) => {
            if (typeof v === "number") {
              stepSetter(Number(v));
            }
          }}
          value={step}
          aria-label="Default"
          valueLabelDisplay="auto"
          min={0}
          max={32}
          style={{ maxWidth: "150px" }}
        />
        <div>{calcEffort(step)}</div>
      </Stack>
    </>
  );
}
export interface EffortSlider {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

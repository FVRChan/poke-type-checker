import React from "react";
// import {South} from '@mui/icons-material';
import { Button, Slider, Stack } from "@mui/material";
import { calcEffort, calcRealValueHPStat } from "./util";
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
  personality?: 0.9 | 1.0 | 1.1;
  personalitySetter?: (newValue: 0.9 | 1.0 | 1.1) => void;
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
            <button
              style={{ margin: "1px" }}
              onClick={() => {
                if (personality === 0.9) {
                  personalitySetter(1.0);
                } else if (personality === 1.0) {
                  personalitySetter(1.1);
                } else if (personality === 1.1) {
                  personalitySetter(0.9);
                }
              }}
            >
              {personality === 1.0 ? "1.0" : personality}
            </button>
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

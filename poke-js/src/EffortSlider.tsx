import React from "react";
import { Slider, Stack } from "@mui/material";
import { calcEffort } from "./util";
export default function EffortSlider({
  label,step,
  stepSetter,
}: {
  label:string,
  step: number;
  stepSetter: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
      <div>{label}</div>
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
      />
      <div>{calcEffort(step)}</div>
    </Stack>
  );
}

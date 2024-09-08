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
            <Button
              color={personality === 0.9 ? "success" : undefined}
              variant="contained" size={"small"} style={{margin:"1px"}}
              onClick={() => {
                personalitySetter(0.9);
              }}
            >
              0.9
            </Button>
            <Button
              color={personality === 1.0 ? "success" : undefined}
              variant="contained" size={"small"} style={{margin:"1px"}}
              onClick={() => {
                personalitySetter(1.0);
              }}
            >
              1.0
            </Button>
            <Button
              color={personality === 1.1 ? "success" : undefined}
              variant="contained" size={"small"} style={{margin:"1px"}}
              onClick={() => {
                personalitySetter(1.1);
              }}
            >
              1.1
            </Button>
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

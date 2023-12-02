import React from "react";
import { typeCheckerI } from "./interface";
import { FormControlLabel, Checkbox } from "@mui/material";
import { type_en_to_ja } from "./const";

export default function TypeChecker({
  typeChecker,
  setTypeChecker,
}: {
  typeChecker: typeCheckerI;
  setTypeChecker: (tc: typeCheckerI) => void;
}) {
  return (
    <div>
      {Object.keys(typeChecker).map((t) => {
        return (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeChecker[t]}
                  onChange={() => {
                    const tc = JSON.parse(JSON.stringify(typeChecker));
                    tc[t] = !tc[t];
                    setTypeChecker(tc);
                  }}
                />
              }
              label={type_en_to_ja[t]}
            />
          </>
        );
      })}
    </div>
  );
}

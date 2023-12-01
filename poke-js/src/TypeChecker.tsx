import { typeCheckerI, type_en_to_ja } from "./App";
import { FormControlLabel, Checkbox } from "@mui/material";

export default function TypeChecker({
  typeChecker,
  setTypeChecker,
}: {
  typeChecker: typeCheckerI;
  setTypeChecker: (tc: typeCheckerI) => void;
}) {
  return (
    <>
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
    </>
  );
}

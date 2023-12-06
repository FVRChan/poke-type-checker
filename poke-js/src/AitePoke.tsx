import React, { useRef } from "react";
import { Pokemon } from "./interface";
export default function AitePoke({ poke, i }: { poke: Pokemon; i: number }) {
  return (
    <>
      <div id={`aitepoke${i}`}>
        {poke.front_picture ? (
          <img src={poke.front_picture} width={50} height={50}></img>
        ) : (
          <>
            <div>{poke.pokemon_name}</div>
            <div>
              {poke.pokemon_type1_ja}
              {poke.pokemon_type2_ja && <>/{poke.pokemon_type2_ja}</>}
            </div>
          </>
        )}
      </div>
    </>
  );
}

import React, { useRef } from "react";
import { Pokemon, PokemonMove, selectedPokemonCookieKey } from "./interface";
export default function MyPoke({
  poke,
  i,
  handlerSetShowMoveList,
  handleChangeMyPokemonMove,
}: {
  poke: Pokemon;
  i: number;
  handlerSetShowMoveList: (i: number) => void;
  handleChangeMyPokemonMove: (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number,
    jjj: number
  ) => void;
}) {
  const getMove = (poke: Pokemon, num: number): PokemonMove | undefined => {
    if (num === 1) {
      return poke.sm1;
    } else if (num === 2) {
      return poke.sm2;
    } else if (num === 3) {
      return poke.sm3;
    } else if (num === 4) {
      return poke.sm4;
    }
    return undefined;
  };

  return (
    <>
      <div>
        {poke.front_picture ? (
          <img
            id={`mypoke${i}`}
            onClick={() => {
              handlerSetShowMoveList(i);
            }}
            src={poke.front_picture}
            width={50}
            height={50}
          ></img>
        ) : (
          <>
            <div
              onClick={() => {
                handlerSetShowMoveList(i);
              }}
            >
              {poke.pokemon_name}
            </div>
            <div>
              {poke.pokemon_type1_ja}
              {poke.pokemon_type2_ja && <>/{poke.pokemon_type2_ja}</>}
            </div>
          </>
        )}
      </div>
      {poke.showMovelist && (
        <div>
          <div>
            {[1, 2, 3, 4].map((jjj) => {
              return (
                <div>
                  <select
                    onChange={(e) => {
                      handleChangeMyPokemonMove(e, i, jjj);
                    }}
                  >
                    <option value={undefined}></option>
                    {poke.moves.map((pm) => {
                      return (
                        <option
                          value={pm.id}
                          selected={getMove(poke, jjj)?.id === pm.id}
                        >
                          {pm.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

import dataclasses
from dataclasses import dataclass


@dataclass
class PokemonType:
    id: int
    name_ja: str
    name_en: str

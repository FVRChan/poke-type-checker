const type_map = {
  normal: {
    damage_relations: {
      double_damage_from: ["fighting"],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: ["rock", "steel"],
      no_damage_from: ["ghost"],
      no_damage_to: ["ghost"],
    },
  },
  fighting: {
    damage_relations: {
      double_damage_from: ["flying", "psychic", "fairy"],
      double_damage_to: ["normal", "rock", "steel", "ice", "freezedry", "dark"],
      half_damage_from: ["rock", "bug", "dark"],
      half_damage_to: ["flying", "poison", "bug", "psychic", "fairy"],
      no_damage_from: [],
      no_damage_to: ["ghost"],
    },
  },
  flying: {
    damage_relations: {
      double_damage_from: ["rock", "electric", "ice", "freezedry"],
      double_damage_to: ["fighting", "bug", "grass"],
      half_damage_from: ["fighting", "bug", "grass"],
      half_damage_to: ["rock", "steel", "electric"],
      no_damage_from: ["ground"],
      no_damage_to: [],
    },
  },
  poison: {
    damage_relations: {
      double_damage_from: ["ground", "psychic"],
      double_damage_to: ["grass", "fairy"],
      half_damage_from: ["fighting", "poison", "bug", "grass", "fairy"],
      half_damage_to: ["poison", "ground", "rock", "ghost"],
      no_damage_from: [],
      no_damage_to: ["steel"],
    },
  },
  ground: {
    damage_relations: {
      double_damage_from: ["water", "grass", "ice", "freezedry"],
      double_damage_to: ["poison", "rock", "steel", "fire", "electric"],
      half_damage_from: ["poison", "rock"],
      half_damage_to: ["bug", "grass"],
      no_damage_from: ["electric"],
      no_damage_to: ["flying"],
    },
  },
  rock: {
    damage_relations: {
      double_damage_from: ["fighting", "ground", "steel", "water", "grass"],
      double_damage_to: ["flying", "bug", "fire", "ice", "freezedry"],
      half_damage_from: ["normal", "flying", "poison", "fire"],
      half_damage_to: ["fighting", "ground", "steel"],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  bug: {
    damage_relations: {
      double_damage_from: ["flying", "rock", "fire"],
      double_damage_to: ["grass", "psychic", "dark"],
      half_damage_from: ["fighting", "ground", "grass"],
      half_damage_to: [
        "fighting",
        "flying",
        "poison",
        "ghost",
        "steel",
        "fire",
        "fairy",
      ],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  ghost: {
    damage_relations: {
      double_damage_from: ["ghost", "dark"],
      double_damage_to: ["ghost", "psychic"],
      half_damage_from: ["poison", "bug"],
      half_damage_to: ["dark"],
      no_damage_from: ["normal", "fighting"],
      no_damage_to: ["normal"],
    },
  },
  steel: {
    damage_relations: {
      double_damage_from: ["fighting", "ground", "fire"],
      double_damage_to: ["rock", "ice", "freezedry", "fairy"],
      half_damage_from: [
        "normal",
        "flying",
        "rock",
        "bug",
        "steel",
        "grass",
        "psychic",
        "ice",
        "freezedry",
        "dragon",
        "fairy",
      ],
      half_damage_to: ["steel", "fire", "water", "electric"],
      no_damage_from: ["poison"],
      no_damage_to: [],
    },
  },
  fire: {
    damage_relations: {
      double_damage_from: ["ground", "rock", "water"],
      double_damage_to: ["bug", "steel", "grass", "ice", "freezedry"],
      half_damage_from: [
        "bug",
        "steel",
        "fire",
        "grass",
        "ice",
        "freezedry",
        "fairy",
      ],
      half_damage_to: ["rock", "fire", "water", "dragon"],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  water: {
    damage_relations: {
      double_damage_from: ["grass", "electric", "freezedry"],
      double_damage_to: ["ground", "rock", "fire"],
      half_damage_from: ["steel", "fire", "water", "ice"],
      half_damage_to: ["water", "grass", "dragon"],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  grass: {
    damage_relations: {
      double_damage_from: [
        "flying",
        "poison",
        "bug",
        "fire",
        "ice",
        "freezedry",
      ],
      double_damage_to: ["ground", "rock", "water"],
      half_damage_from: ["ground", "water", "grass", "electric"],
      half_damage_to: [
        "flying",
        "poison",
        "bug",
        "steel",
        "fire",
        "grass",
        "dragon",
      ],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  electric: {
    damage_relations: {
      double_damage_from: ["ground"],
      double_damage_to: ["flying", "water"],
      half_damage_from: ["flying", "steel", "electric"],
      half_damage_to: ["grass", "electric", "dragon"],
      no_damage_from: [],
      no_damage_to: ["ground"],
    },
  },
  psychic: {
    damage_relations: {
      double_damage_from: ["bug", "ghost", "dark"],
      double_damage_to: ["fighting", "poison"],
      half_damage_from: ["fighting", "psychic"],
      half_damage_to: ["steel", "psychic"],
      no_damage_from: [],
      no_damage_to: ["dark"],
    },
  },
  ice: {
    damage_relations: {
      double_damage_from: ["fighting", "rock", "steel", "fire"],
      double_damage_to: ["flying", "ground", "grass", "dragon"],
      half_damage_from: ["ice", "freezedry"],
      half_damage_to: ["steel", "fire", "water", "ice", "freezedry"],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  dragon: {
    damage_relations: {
      double_damage_from: ["ice", "freezedry", "dragon", "fairy"],
      double_damage_to: ["dragon"],
      half_damage_from: ["fire", "water", "grass", "electric"],
      half_damage_to: ["steel"],
      no_damage_from: [],
      no_damage_to: ["fairy"],
    },
  },
  dark: {
    damage_relations: {
      double_damage_from: ["fighting", "bug", "fairy"],
      double_damage_to: ["ghost", "psychic"],
      half_damage_from: ["ghost", "dark"],
      half_damage_to: ["fighting", "dark", "fairy"],
      no_damage_from: ["psychic"],
      no_damage_to: [],
    },
  },
  fairy: {
    damage_relations: {
      double_damage_from: ["poison", "steel"],
      double_damage_to: ["fighting", "dragon", "dark"],
      half_damage_from: ["fighting", "bug", "dark"],
      half_damage_to: ["poison", "steel", "fire"],
      no_damage_from: ["dragon"],
      no_damage_to: [],
    },
  },
} as typeRelationMapper;

interface typeRelation {
  damage_relations: {
    double_damage_from: Array<string>;
    double_damage_to: Array<string>;
    half_damage_from: Array<string>;
    half_damage_to: Array<string>;
    no_damage_from: Array<string>;
    no_damage_to: Array<string>;
  };
}
interface typeRelationMapper {
  [index: string]: typeRelation;
}

export default type_map;

const type_map = {
  1: {
    damage_relations: {
      double_damage_from: [2],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: [6, 9],
      no_damage_from: [8],
      no_damage_to: [8],
    },
  },
  2: {
    damage_relations: {
      double_damage_from: [3, 14, 18],
      double_damage_to: [1, 6, 9, 15, 17],
      half_damage_from: [6, 7, 17],
      half_damage_to: [3, 4, 7, 14, 18],
      no_damage_from: [],
      no_damage_to: [8],
    },
  },
  3: {
    damage_relations: {
      double_damage_from: [6, 13, 15],
      double_damage_to: [2, 7, 12],
      half_damage_from: [2, 7, 12],
      half_damage_to: [6, 9, 13],
      no_damage_from: [5],
      no_damage_to: [],
    },
  },
  4: {
    damage_relations: {
      double_damage_from: [5, 14],
      double_damage_to: [12, 18],
      half_damage_from: [2, 4, 7, 12, 18],
      half_damage_to: [4, 5, 6, 8],
      no_damage_from: [],
      no_damage_to: [9],
    },
  },
  5: {
    damage_relations: {
      double_damage_from: [11, 12, 15],
      double_damage_to: [4, 6, 9, 10, 13],
      half_damage_from: [4, 6],
      half_damage_to: [7, 12],
      no_damage_from: [13],
      no_damage_to: [3],
    },
  },
  6: {
    damage_relations: {
      double_damage_from: [2, 5, 9, 11, 12],
      double_damage_to: [3, 7, 10, 15],
      half_damage_from: [1, 3, 4, 10],
      half_damage_to: [2, 5, 9],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  7: {
    damage_relations: {
      double_damage_from: [3, 6, 10],
      double_damage_to: [12, 14, 17],
      half_damage_from: [2, 5, 12],
      half_damage_to: [
        2,
        3,
        4,
        8,
        9,
        10,
        18,
      ],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  8: {
    damage_relations: {
      double_damage_from: [8, 17],
      double_damage_to: [8, 14],
      half_damage_from: [4, 7],
      half_damage_to: [17],
      no_damage_from: [1, 2],
      no_damage_to: [1],
    },
  },
  9: {
    damage_relations: {
      double_damage_from: [2, 5, 10],
      double_damage_to: [6, 15, 18],
      half_damage_from: [
        1,
        3,
        6,
        7,
        9,
        12,
        14,
        15,
        16,
        18,
      ],
      half_damage_to: [9, 10, 11, 13],
      no_damage_from: [4],
      no_damage_to: [],
    },
  },
  10: {
    damage_relations: {
      double_damage_from: [5, 6, 11],
      double_damage_to: [7, 9, 12, 15],
      half_damage_from: [7, 9, 10, 12, 15, 18],
      half_damage_to: [6, 10, 11, 16],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  11: {
    damage_relations: {
      double_damage_from: [12, 13],
      double_damage_to: [5, 6, 10],
      half_damage_from: [9, 10, 11, 15],
      half_damage_to: [11, 12, 16],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  12: {
    damage_relations: {
      double_damage_from: [3, 4, 7, 10, 15],
      double_damage_to: [5, 6, 11],
      half_damage_from: [5, 11, 12, 13],
      half_damage_to: [
        3,
        4,
        7,
        9,
        10,
        12,
        16,
      ],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  13: {
    damage_relations: {
      double_damage_from: [5],
      double_damage_to: [3, 11],
      half_damage_from: [3, 9, 13],
      half_damage_to: [12, 13, 16],
      no_damage_from: [],
      no_damage_to: [5],
    },
  },
  14: {
    damage_relations: {
      double_damage_from: [7, 8, 17],
      double_damage_to: [2, 4],
      half_damage_from: [2, 14],
      half_damage_to: [9, 14],
      no_damage_from: [],
      no_damage_to: [17],
    },
  },
  15: {
    damage_relations: {
      double_damage_from: [2, 6, 9, 10],
      double_damage_to: [3, 5, 12, 16],
      half_damage_from: [15],
      half_damage_to: [9, 10, 11, 15],
      no_damage_from: [],
      no_damage_to: [],
    },
  },
  16: {
    damage_relations: {
      double_damage_from: [15, 16, 18],
      double_damage_to: [16],
      half_damage_from: [10, 11, 12, 13],
      half_damage_to: [9],
      no_damage_from: [],
      no_damage_to: [18],
    },
  },
  17: {
    damage_relations: {
      double_damage_from: [2, 7, 18],
      double_damage_to: [8, 14],
      half_damage_from: [8, 17],
      half_damage_to: [2, 17, 18],
      no_damage_from: [14],
      no_damage_to: [],
    },
  },
  18: {
    damage_relations: {
      double_damage_from: [4, 9],
      double_damage_to: [2, 16, 17],
      half_damage_from: [2, 7, 17],
      half_damage_to: [4, 9, 10],
      no_damage_from: [16],
      no_damage_to: [],
    },
  },
} as typeRelationMapper;

interface typeRelation {
  damage_relations: {
    double_damage_from: Array<number>;
    double_damage_to: Array<number>;
    half_damage_from: Array<number>;
    half_damage_to: Array<number>;
    no_damage_from: Array<number>;
    no_damage_to: Array<number>;
  };
}
interface typeRelationMapper {
  [index: number]: typeRelation;
}

export default type_map;

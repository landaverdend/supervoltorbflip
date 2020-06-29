//before you vomit in disgust, this is how difficulty worked in original voltorb flip:https://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip

const size4Placements = {
  1: [{ twos: 2, threes: 0, bombs: 2 }],
  2: [{ twos: 3, threes: 0, bombs: 3 }],
  3: [{ twos: 3, threes: 0, bombs: 3 }],
  4: [{ twos: 3, threes: 0, bombs: 3 }],
  5: [{ twos: 3, threes: 0, bombs: 4 }],
  6: [{ twos: 3, threes: 0, bombs: 4 }],
  7: [{ twos: 4, threes: 0, bombs: 4 }],
  8: [{ twos: 4, threes: 0, bombs: 5 }],
};

const size5Placements = {
  1: [
    { twos: 2, threes: 0, bombs: 4 },
    { twos: 0, threes: 2, bombs: 4 },
    { twos: 4, threes: 0, bombs: 4 },
    { twos: 2, threes: 1, bombs: 4 },
    { twos: 3, threes: 0, bombs: 4 },
  ],
  2: [
    { twos: 0, threes: 2, bombs: 5 },
    { twos: 5, threes: 0, bombs: 5 },
    { twos: 2, threes: 1, bombs: 5 },
    { twos: 0, threes: 3, bombs: 5 },
    { twos: 4, threes: 0, bombs: 5 },
  ],
  3: [
    { twos: 1, threes: 2, bombs: 5 },
    { twos: 6, threes: 0, bombs: 5 },
    { twos: 3, threes: 1, bombs: 5 },
    { twos: 0, threes: 3, bombs: 5 },
    { twos: 5, threes: 0, bombs: 5 },
  ],
  4: [
    { twos: 2, threes: 2, bombs: 5 },
    { twos: 0, threes: 3, bombs: 5 },
    { twos: 7, threes: 0, bombs: 6 },
    { twos: 4, threes: 1, bombs: 6 },
    { twos: 1, threes: 3, bombs: 6 },
  ],
  5: [
    { twos: 6, threes: 0, bombs: 6 },
    { twos: 3, threes: 2, bombs: 6 },
    { twos: 0, threes: 4, bombs: 6 },
    { twos: 8, threes: 0, bombs: 6 },
    { twos: 5, threes: 1, bombs: 6 },
  ],
  6: [
    { twos: 2, threes: 3, bombs: 7 },
    { twos: 0, threes: 5, bombs: 7 },
    { twos: 7, threes: 0, bombs: 7 },
    { twos: 4, threes: 2, bombs: 7 },
    { twos: 1, threes: 4, bombs: 7 },
  ],
  7: [
    { twos: 0, threes: 5, bombs: 7 },
    { twos: 8, threes: 0, bombs: 7 },
    { twos: 6, threes: 1, bombs: 7 },
    { twos: 3, threes: 3, bombs: 7 },
    { twos: 5, threes: 2, bombs: 7 },
  ],
  8: [
    { twos: 0, threes: 6, bombs: 7 },
    { twos: 7, threes: 1, bombs: 7 },
    { twos: 4, threes: 3, bombs: 8 },
    { twos: 1, threes: 5, bombs: 8 },
    { twos: 6, threes: 2, bombs: 8 },
  ],
};

//whole grids should scale from level having 25% bombs to level 8 having 40% - 50% bombs

const size6Placements = {
  //24, 27, 32, 36, 48
  1: [
    { twos: 3, threes: 1, bombs: 6 }, //24
    { twos: 0, threes: 3, bombs: 6 }, //27
    { twos: 5, threes: 0, bombs: 6 }, //32
    { twos: 2, threes: 2, bombs: 6 }, //36
    { twos: 4, threes: 1, bombs: 6 }, //48
  ],
  2: [
    { twos: 1, threes: 3, bombs: 7 }, //54
    { twos: 6, threes: 0, bombs: 7 }, //64
    { twos: 3, threes: 2, bombs: 7 }, //72
    { twos: 0, threes: 4, bombs: 7 }, //81
    { twos: 5, threes: 1, bombs: 7 }, //96
  ],
  3: [
    { twos: 2, threes: 3, bombs: 8 }, //108
    { twos: 7, threes: 0, bombs: 8 }, //128
    { twos: 4, threes: 2, bombs: 8 }, //144
    { twos: 1, threes: 4, bombs: 8 }, //162
    { twos: 6, threes: 1, bombs: 8 }, //192
  ],
  4: [
    { twos: 3, threes: 3, bombs: 8 }, //216
    { twos: 0, threes: 5, bombs: 8 }, //243
    { twos: 8, threes: 0, bombs: 10 }, //256
    { twos: 5, threes: 2, bombs: 10 }, //288
    { twos: 2, threes: 4, bombs: 10 }, //324
  ],
  5: [
    { twos: 7, threes: 1, bombs: 10 }, //384
    { twos: 4, threes: 3, bombs: 10 }, //432
    { twos: 1, threes: 5, bombs: 10 }, //486
    { twos: 9, threes: 0, bombs: 10 }, //512
    { twos: 6, threes: 2, bombs: 10 }, //576
  ],
  6: [
    { twos: 3, threes: 4, bombs: 10 }, //648
    { twos: 0, threes: 6, bombs: 10 }, //729
    { twos: 8, threes: 1, bombs: 10 }, //768
    { twos: 5, threes: 3, bombs: 10 }, //864
    { twos: 2, threes: 5, bombs: 10 }, //972
  ],
  7: [
    { twos: 1, threes: 6, bombs: 13 }, //1458
    { twos: 9, threes: 1, bombs: 13 }, //1536
    { twos: 7, threes: 2, bombs: 10 }, //1152
    { twos: 4, threes: 4, bombs: 10 }, //1296
    { twos: 6, threes: 3, bombs: 10 }, //1728
  ],
  8: [
    { twos: 0, threes: 7, bombs: 10 }, //2187
    { twos: 8, threes: 2, bombs: 10 }, //2304
    { twos: 5, threes: 4, bombs: 10 }, //2592
    { twos: 2, threes: 6, bombs: 10 }, //2916
    { twos: 7, threes: 3, bombs: 10 }, //3456
  ],
};

const difficultyPlacements = {
  4: size4Placements,
  5: size5Placements,
  6: size6Placements,
  7: size6Placements,
  8: size6Placements,
  9: size6Placements,
};

export default difficultyPlacements;

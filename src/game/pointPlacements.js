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
  //12%-20% values and 25% bombs
  1: [
    { twos: 3, threes: 1, bombs: 6 },
    { twos: 0, threes: 3, bombs: 6 },
    { twos: 5, threes: 0, bombs: 6 },
    { twos: 2, threes: 2, bombs: 6 },
    { twos: 4, threes: 1, bombs: 6 },
  ],
  //16%-24% values and 28% bombs
  2: [
    { twos: 1, threes: 3, bombs: 7 },
    { twos: 6, threes: 0, bombs: 7 },
    { twos: 3, threes: 2, bombs: 7 },
    { twos: 0, threes: 4, bombs: 7 },
    { twos: 5, threes: 1, bombs: 7 },
  ],
  // 20%-28% values and 32% bombs
  3: [
    { twos: 2, threes: 3, bombs: 8 }, //108
    { twos: 7, threes: 0, bombs: 8 }, //128
    { twos: 4, threes: 2, bombs: 8 }, //144
    { twos: 1, threes: 4, bombs: 8 }, //162
    { twos: 6, threes: 1, bombs: 8 }, //192
  ],
  // 20%-32% values and 40% bombs
  4: [
    { twos: 3, threes: 3, bombs: 8 }, //216
    { twos: 0, threes: 5, bombs: 8 }, //243
    { twos: 8, threes: 0, bombs: 10 }, //256
    { twos: 5, threes: 2, bombs: 10 }, //288
    { twos: 2, threes: 4, bombs: 10 }, //324
  ],
  // 24% - 36% values and 40% bombs
  5: [
    { twos: 7, threes: 1, bombs: 10 }, //384
    { twos: 4, threes: 3, bombs: 10 }, //432
    { twos: 1, threes: 5, bombs: 10 }, //486
    { twos: 9, threes: 0, bombs: 10 }, //512
    { twos: 6, threes: 2, bombs: 10 }, //576
  ],
  // 24% - 36% values and 40% bombs
  6: [
    { twos: 3, threes: 4, bombs: 10 }, //648
    { twos: 0, threes: 6, bombs: 10 }, //729
    { twos: 8, threes: 1, bombs: 10 }, //768
    { twos: 5, threes: 3, bombs: 10 }, //864
    { twos: 2, threes: 5, bombs: 10 }, //972
  ],
  // 28% - 40% values and 40% bombs
  7: [
    { twos: 1, threes: 6, bombs: 13 }, //1458
    { twos: 9, threes: 1, bombs: 13 }, //1536
    { twos: 7, threes: 2, bombs: 10 }, //1152
    { twos: 4, threes: 4, bombs: 10 }, //1296
    { twos: 6, threes: 3, bombs: 10 }, //1728
  ],
  // 28% - 40% values and 40% bombs
  8: [
    { twos: 0, threes: 7, bombs: 10 }, //2187
    { twos: 8, threes: 2, bombs: 10 }, //2304
    { twos: 5, threes: 4, bombs: 10 }, //2592
    { twos: 2, threes: 6, bombs: 10 }, //2916
    { twos: 7, threes: 3, bombs: 10 }, //3456
  ],
};

const size7Placements = {
  //12%-20% values and 25% bombs
  1: [
    { twos: 4, threes: 2, bombs: 9 },
    { twos: 1, threes: 4, bombs: 9 },
    { twos: 6, threes: 1, bombs: 9 },
    { twos: 3, threes: 3, bombs: 9 },
    { twos: 5, threes: 2, bombs: 9 },
  ],
  //16%-24% values and 28% bombs
  2: [
    { twos: 2, threes: 4, bombs: 10 },
    { twos: 7, threes: 1, bombs: 10 },
    { twos: 4, threes: 3, bombs: 10 },
    { twos: 1, threes: 5, bombs: 10 },
    { twos: 6, threes: 2, bombs: 10 },
  ],
  // 20%-28% values and 32% bombs
  3: [
    { twos: 3, threes: 4, bombs: 12 },
    { twos: 8, threes: 2, bombs: 12 },
    { twos: 5, threes: 3, bombs: 12 },
    { twos: 2, threes: 5, bombs: 12 },
    { twos: 8, threes: 2, bombs: 12 },
  ],
  // 20%-32% values and 40% bombs
  4: [
    { twos: 4, threes: 4, bombs: 14 },
    { twos: 0, threes: 7, bombs: 14 },
    { twos: 9, threes: 1, bombs: 14 },
    { twos: 8, threes: 4, bombs: 14 },
    { twos: 4, threes: 6, bombs: 14 },
  ],
  // 24% - 36% values and 40% bombs
  5: [
    { twos: 9, threes: 3, bombs: 14 },
    { twos: 6, threes: 5, bombs: 14 },
    { twos: 3, threes: 6, bombs: 14 },
    { twos: 10, threes: 3, bombs: 14 },
    { twos: 8, threes: 4, bombs: 14 },
  ],
  // 24% - 36% values and 40% bombs
  6: [
    { twos: 9, threes: 3, bombs: 14 },
    { twos: 6, threes: 5, bombs: 14 },
    { twos: 3, threes: 6, bombs: 14 },
    { twos: 10, threes: 3, bombs: 14 },
    { twos: 8, threes: 4, bombs: 14 },
  ],
  // 28% - 40% values and 40% bombs
  7: [
    { twos: 3, threes: 7, bombs: 15 },
    { twos: 10, threes: 4, bombs: 15 },
    { twos: 8, threes: 4, bombs: 15 },
    { twos: 5, threes: 6, bombs: 15 },
    { twos: 9, threes: 6, bombs: 15 },
  ],
  // 28% - 40% values and 40% bombs
  8: [
    { twos: 3, threes: 7, bombs: 15 },
    { twos: 10, threes: 4, bombs: 15 },
    { twos: 8, threes: 4, bombs: 15 },
    { twos: 5, threes: 6, bombs: 15 },
    { twos: 9, threes: 6, bombs: 15 },
  ],
};

const size8Placements = {
  //12%-20% values and 25% bombs
  1: [{ twos: 5, threes: 2, fours: 1, bombs: 12 }], //1152
  //16%-24% values and 28% bombs
  2: [{ twos: 6, threes: 3, fours: 1, bombs: 14 }], //6912
  // 20%-28% values and 32% bombs
  3: [{ twos: 5, threes: 3, fours: 2, bombs: 15 }], //13824
  // 20%-32% values and 40% bombs
  4: [{ twos: 6, threes: 4, fours: 2, bombs: 16 }], //82944
  // 24% - 36% values and 40% bombs
  5: [{ twos: 7, threes: 3, fours: 3, bombs: 18 }], //221184
  // 24% - 36% values and 40% bombs
  6: [{ twos: 10, threes: 3, fours: 2, bombs: 18 }], //442368
  // 28% - 40% values and 40% bombs
  7: [{ twos: 10, threes: 3, fours: 2, bombs: 18 }],
  // 28% - 40% values and 40% bombs
  8: [{ twos: 11, threes: 3, fours: 2, bombs: 18 }],
};

const size9Placements = {
  //12%-20% values and 25% bombs
  1: [{ twos: 2, threes: 2, fours: 2, fives: 2, bombs: 16 }], //14400
  //16%-24% values and 28% bombs
  2: [{ twos: 3, threes: 3, fours: 2, fives: 2, bombs: 18 }], //86400
  // 20%-28% values and 32% bombs
  3: [{ twos: 4, threes: 4, fours: 2, fives: 2, bombs: 20 }], //518400
  // 20%-32% values and 40% bombs
  4: [{ twos: 5, threes: 4, fours: 2, fives: 2, bombs: 25 }], //1036800
  // 24% - 36% values and 40% bombs
  5: [{ twos: 5, threes: 5, fours: 2, fives: 2, bombs: 25 }], //3110400
  // 24% - 36% values and 40% bombs
  6: [{ twos: 5, threes: 5, fours: 3, fives: 2, bombs: 25 }], //12441600
  // 28% - 40% values and 40% bombs
  7: [{ twos: 5, threes: 5, fours: 3, fives: 2, bombs: 25 }], //49766400
  // 28% - 40% values and 40% bombs
  8: [{ twos: 5, threes: 5, fours: 3, fives: 4, bombs: 25 }], //49766400
};

const difficultyPlacements = {
  4: size4Placements,
  5: size5Placements,
  6: size6Placements,
  7: size7Placements,
  8: size8Placements,
  9: size9Placements,
};
console.log(difficultyPlacements);
export default difficultyPlacements;

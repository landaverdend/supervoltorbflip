import TileType from "./tileType.js";
import difficultyPlacements from "./pointPlacements";
const initialMemos = { BOMB: false, ONE: false, TWO: false, THREE: false };

function placePoints(grid, dimension, level) {
  let placeableArea = dimension - 1;
  // let pointPermutation = size6Placements[level][getRandomRange(5)];
  let permLength = difficultyPlacements[dimension][level].length;
  let pointPermutation =
    difficultyPlacements[dimension][level][getRandomRange(permLength)];
  let placePoints = (value, amount, grid) => {
    for (let counter = 0; counter < amount; ) {
      let i = getRandomRange(placeableArea);
      let j = getRandomRange(placeableArea);
      if (grid[i][j].value === 1) {
        grid[i][j].value = value;
        counter++;
      }
    }
  };

  placePoints(0, pointPermutation.bombs, grid);
  placePoints(2, pointPermutation.twos, grid);
  placePoints(3, pointPermutation.threes, grid);
  let maxRoundPoints =
    Math.pow(2, pointPermutation.twos) * Math.pow(3, pointPermutation.threes);
  return { grid: grid, maxRoundPoints: maxRoundPoints };
}

export const generateInitialGrid = (dimension, level) => {
  let rows = [];
  for (let i = 0; i < dimension; i++) {
    let cols = [];
    for (let j = 0; j < dimension; j++) {
      let edge = dimension - 1;
      if (i !== edge && j !== edge) {
        // let type = getRandomRange(3);
        cols.push({
          value: 1,
          clickable: true,
          clicked: false,
          memos: initialMemos,
        });
      }
      // outside tile
      else
        cols.push({
          clickable: false,
          pointSum: 0, //how many points are in each row.
          bombCount: 0, //bombs in each row.
        });
    }
    rows.push(cols);
  }

  rows[dimension - 1].pop(); //get rid of bottom right tile.
  let boardInfo = placePoints(rows, dimension, level);
  rows = boardInfo.grid;
  // console.log(boardInfo.maxRoundPoints);
  return {
    grid: calculateEdgeTileValues(rows),
    maxRoundPoints: boardInfo.maxRoundPoints,
  };
};

function getRandomRange(num) {
  return Math.floor(Math.random() * num);
}

//get a sum of each row/col and number of bombs.
function calculateEdgeTileValues(arr) {
  let edge = arr.length - 1; //don't count the edge pieces.
  for (let i = 0; i < edge; i++) {
    for (let j = 0; j < edge; j++) {
      switch (arr[i][j].value) {
        case TileType.BOMB:
          arr[i][edge].bombCount++;
          arr[edge][j].bombCount++;
          break;
        default:
          arr[i][edge].pointSum += arr[i][j].value;
          arr[edge][j].pointSum += arr[i][j].value;
          break;
      }
    }
  }
  return arr;
}

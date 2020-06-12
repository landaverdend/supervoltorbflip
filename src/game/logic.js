import TileType from "./tileType.js";

export const generateInitialGrid = (dimension) => {
  let rows = [];
  for (let i = 0; i < dimension; i++) {
    let cols = [];
    for (let j = 0; j < dimension; j++) {
      let edge = dimension - 1;

      if (i !== edge && j !== edge)
        cols.push({ value: TileType.ONE, clickable: true, clicked: false });
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
  return calculateEdgeTileValues(rows);
};

//get a sum of each row/col and number of bombs.
function calculateEdgeTileValues(arr) {
  let edge = arr.length - 1; //don't count the edge pieces.
  for (let i = 0; i < edge; i++) {
    for (let j = 0; j < edge; j++) {
      switch (arr[i][j].value) {
        case TileType.BOMB:
          //for each tile at end of row, count total amount of lossTiles in that row.
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

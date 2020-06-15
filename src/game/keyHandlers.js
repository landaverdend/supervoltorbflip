const ARROW_KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};

export const arrowHandler = (row, col, keyCode, dimension) => {
  //   let temp = currentTile.splice();
  //   let temp = [row, col];
  if (row === -1 && col === -1) return [0, 0];

  switch (keyCode) {
    case ARROW_KEYS.UP:
      row--;
      break;
    case ARROW_KEYS.DOWN:
      row++;
      break;
    case ARROW_KEYS.LEFT:
      col--;
      break;
    case ARROW_KEYS.RIGHT:
      col++;
      break;
  }
  let edge = dimension - 2;
  //edge cases.
  col = col < 0 ? edge : col;
  col = col > edge ? 0 : col;
  row = row < 0 ? edge : row;
  row = row > edge ? 0 : row;
  return [row, col];
};

export const memoHandler = (keyCode, grid, currentTile, dispatchFunction) => {
  //get outta here.
  if (
    currentTile[0] === -1 ||
    currentTile[1] === -1 ||
    currentTile === undefined
  ) {
    return;
  }
  let memos = grid[currentTile[0]][currentTile[1]].memos;
  if (memos === undefined) return;

  if (keyCode === 192) {
    dispatchFunction({ ...memos, BOMB: !memos.BOMB });
  }
  //one key
  if (keyCode === 49) {
    dispatchFunction({ ...memos, ONE: !memos.ONE });
  }
  if (keyCode === 50) {
    dispatchFunction({ ...memos, TWO: !memos.TWO });
  }
  if (keyCode === 51) {
    dispatchFunction({ ...memos, THREE: !memos.THREE });
  }
};

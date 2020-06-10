const ARROW_KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};

export const keyHandler = (row, col, keyCode, dimension) => {
  //   let temp = currentTile.splice();
  //   let temp = [row, col];
  let edge = dimension - 2;
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
  //edge cases.
  col = col < 0 ? edge : col;
  col = col > edge ? 0 : col;
  row = row < 0 ? edge : row;
  row = row > edge ? 0 : row;
  return [row, col];
};

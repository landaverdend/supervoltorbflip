import {
  SET_CLICKS,
  CLOSE_DIALOGUE_BOX,
  RESET_GRID,
  OPEN_DIALOGUE_BOX,
  TOGGLE_ROUND_INTERMISSION,
  FLIP_COLUMN,
  UPDATE_LEVEL,
} from "../actions/actionTypes";

const ARROW_KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};

//global variable to keep track of whether or not game is animating
var transitioning = false;

export const arrowHandler = (row, col, keyCode, dimension) => {
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
    default:
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

function cascadeFlip(dimension, dispatch, clickedVal, grid) {
  let func = (num, clickedVal) => {
    dispatch({ type: FLIP_COLUMN, value: num, clicked: clickedVal });
  };
  //interval of when board is being flipped.
  transitioning = true;
  setTimeout(() => {
    transitioning = false;
  }, 200 * dimension);

  for (let i = 0, timeToWait = 0; i < dimension; i++) {
    if (!checkColumnFlipped(i, grid)) {
      setTimeout(() => func(i, clickedVal), timeToWait);
      timeToWait += 200;
    }
  }
}

function cascadeFlipReverse(dimension, dispatch, clickedVal, grid) {
  let func = (num, clickedVal) => {
    dispatch({ type: FLIP_COLUMN, value: num, clicked: clickedVal });
  };
  //interval of when board is being flipped.
  transitioning = true;
  setTimeout(() => {
    transitioning = false;
  }, 200 * dimension);

  for (let i = dimension - 1, timeToWait = 0; i >= 0; i--, timeToWait += 200) {
    setTimeout(() => func(i, clickedVal), timeToWait);
  }
}

function checkColumnFlipped(col, grid) {
  // let flag = true;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][col].clickable && !grid[i][col].clicked) return false;
  }
  return true;
}

//for when the game has dialogue open. I apologize for hard coding it.
export const dialogueHandler = (state, dispatch, keyCode) => {
  //no input allowed on flip or arrow keys
  if (transitioning || (keyCode >= 37 && keyCode <= 40)) return;

  //any keys but arrow should advance the click state.
  let clicks = state.gameReducer.clicks;
  let dimension = state.boardReducer.dimension - 1;

  //close the dialogue box, flip everything over.
  if (clicks === 0) {
    dispatch({ type: CLOSE_DIALOGUE_BOX });
    dispatch({ type: SET_CLICKS, value: clicks + 1 });
    cascadeFlip(dimension, dispatch, true, state.boardReducer.grid);
  }

  //before the animation to return to unclicked
  if (clicks === 1) {
    cascadeFlipReverse(dimension, dispatch, false, state.boardReducer.grid);
    dispatch({ type: SET_CLICKS, value: clicks + 1 });
    let level = state.boardReducer.level;
    if (state.gameReducer.roundLost) {
      level = level - 1 === 0 ? 1 : level - 1;
    } else {
      level = level + 1 === 9 ? 8 : level + 1;
    }
    dispatch({ type: UPDATE_LEVEL, value: level });
    setTimeout(() => {
      dispatch({
        type: OPEN_DIALOGUE_BOX,
        value: "Press any button to continue to level " + level,
      });
    }, 500);
  }

  //Close the dialogue box and start the next round.
  if (clicks === 2) {
    dispatch({ type: RESET_GRID });
    dispatch({ type: CLOSE_DIALOGUE_BOX });
    dispatch({ type: SET_CLICKS, value: 0 });
    dispatch({ type: TOGGLE_ROUND_INTERMISSION });
  }
};

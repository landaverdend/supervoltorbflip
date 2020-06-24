import {
  SET_CLICKS,
  CHANGE_DIALOGUE_TEXT,
  FLIP_ALL,
  CLOSE_DIALOGUE_BOX,
  FLIP_ALL_UNCLICKED,
  RESET_GRID,
  OPEN_DIALOGUE_BOX,
  TOGGLE_ROUND_INTERMISSION,
  FLIP_COLUMN,
} from "../actions/actionTypes";

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

function cascadeFlip(dimension, dispatch, clickedVal) {
  let func = (num, clickedVal) => {
    dispatch({ type: FLIP_COLUMN, value: num, clicked: clickedVal });
  };
  for (let i = 0, timeToWait = 0; i < dimension; i++, timeToWait += 250) {
    setTimeout(() => func(i, clickedVal), timeToWait);
  }
}

function cascadeFlipReverse(dimension, dispatch, clickedVal) {
  let func = (num, clickedVal) => {
    dispatch({ type: FLIP_COLUMN, value: num, clicked: clickedVal });
  };
  for (let i = dimension - 1, timeToWait = 0; i >= 0; i--, timeToWait += 200) {
    setTimeout(() => func(i, clickedVal), timeToWait);
  }
}

//for when the game has dialogue open. I apologize for hard coding it.
export const dialogueHandler = (state, dispatch, keyCode) => {
  //any keys but arrow should advance the click state.
  if (keyCode <= 40 && keyCode >= 37) {
    return;
  }
  let clicks = state.gameReducer.clicks;
  let dimension = state.boardReducer.dimension - 1;
  if (clicks === 0) {
    dispatch({
      type: CHANGE_DIALOGUE_TEXT,
      value: "Resetting collected coins...",
    });
    dispatch({ type: SET_CLICKS, value: clicks + 1 });
  }
  if (clicks === 1) {
    dispatch({ type: CLOSE_DIALOGUE_BOX });
    dispatch({ type: SET_CLICKS, value: clicks + 1 });
    cascadeFlip(dimension, dispatch, true);
  }
  if (clicks === 2) {
    cascadeFlipReverse(dimension, dispatch, false);
    dispatch({ type: SET_CLICKS, value: clicks + 1 });
    setTimeout(() => {
      dispatch({
        type: OPEN_DIALOGUE_BOX,
        value:
          "Press any button to continue to level " + state.gameReducer.level,
      });
    }, 500);
  }
  if (clicks === 3) {
    dispatch({ type: RESET_GRID });
    dispatch({ type: CLOSE_DIALOGUE_BOX });
    dispatch({ type: SET_CLICKS, value: 0 });
    dispatch({ type: TOGGLE_ROUND_INTERMISSION });
  }
};

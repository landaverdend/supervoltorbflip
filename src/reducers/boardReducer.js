import { generateInitialGrid } from "../game/logic.js";
import {
  UPDATE_CLICKED,
  FLIP_ALL,
  UPDATE_CURRENT_TILE,
} from "../actions/actionTypes.js";

let init = generateInitialGrid(6);

const initialState = {
  dimension: 6,
  grid: init,
  currentTile: [0, 0],
};

const boardReducer = (state = initialState, action) => {
  let row = action.row;
  let col = action.col;
  let ref = state.grid.map((arr) => {
    return arr.slice();
  });

  if (action.type === UPDATE_CLICKED) {
    ref[row][col].clicked = !state.grid[row][col].clicked;
    return { ...state, grid: ref };
  }

  if (action.type === FLIP_ALL) {
    for (let i = 0; i < ref.length; i++) {
      for (let j = 0; j < ref[i].length; j++) {
        if (ref[i][j].clickable) {
          ref[i][j].clicked = true;
        }
      }
    }
    return { ...state, grid: ref };
  }

  if (action.type === UPDATE_CURRENT_TILE) {
    console.log("working");
    return state;
  }

  return state;
};

export default boardReducer;

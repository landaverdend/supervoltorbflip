import { generateInitialGrid } from "../game/logic.js";
import { arrowHandler } from "../game/keyHandlers.js";
import {
  UPDATE_CLICKED,
  FLIP_ALL,
  UPDATE_CURRENT_TILE,
  UPDATE_MEMOS,
} from "../actions/actionTypes.js";

let init = generateInitialGrid(6);
const initialState = {
  dimension: 6,
  grid: init,
  currentTile: [-1, -1],
};

const boardReducer = (state = initialState, action) => {
  let ref = state.grid.map((arr) => {
    return arr.slice();
  });

  if (action.type === UPDATE_CLICKED) {
    let curR = state.currentTile[0];
    let curL = state.currentTile[1];
    if (curR === -1 || curL === -1) return state;
    ref[curR][curL].clicked = true;
    ref[curR][curL].memos = {
      BOMB: false,
      ONE: false,
      TWO: false,
      THREE: false,
    };
    return { ...state, grid: ref };
  }

  if (action.type === FLIP_ALL) {
    for (let i = 0; i < ref.length; i++) {
      for (let j = 0; j < ref[i].length; j++) {
        if (ref[i][j].clickable) {
          ref[i][j].clicked = !ref[i][j].clicked;
        }
      }
    }
    return { ...state, grid: ref };
  }

  if (action.type === UPDATE_CURRENT_TILE) {
    //eventinfo shows the expected info for the action.
    if (action.eventInfo.type === "mouse") {
      let cur = [action.eventInfo.row, action.eventInfo.col];
      return { ...state, currentTile: cur };
    }

    if (action.eventInfo.type === "key") {
      let cur = arrowHandler(
        state.currentTile[0],
        state.currentTile[1],
        action.eventInfo.keyCode,
        state.dimension
      );
      return { ...state, currentTile: cur };
    }
  }

  if (action.type === UPDATE_MEMOS) {
    let row = state.currentTile[0];
    let col = state.currentTile[1];
    ref[row][col].memos = action.eventInfo;
    return { ...state, grid: ref };
  }

  return state;
};

export default boardReducer;

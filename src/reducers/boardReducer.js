import { generateInitialGrid } from '../game/logic.js';
let init = generateInitialGrid(6);

const initialState = {
  dimension: 6,
  grid: init,
};

const boardReducer = (state = initialState, action) => {
  return state;
};

export default boardReducer;

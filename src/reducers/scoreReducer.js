import { UPDATE_ROUND_SCORE, UPDATE_TOTAL_SCORE } from "../actions/actionTypes";
const initialState = {
  roundScore: 1,
  totalScore: 1,
  level: 1,
};
const scoreReducer = (state = initialState, action) => {
  if (action.type === UPDATE_ROUND_SCORE) {
    return { ...state, roundScore: action.value };
  }
  if (action.type === UPDATE_TOTAL_SCORE) {
    return { ...state, totalScore: action.value };
  }
  return state;
};
export default scoreReducer;

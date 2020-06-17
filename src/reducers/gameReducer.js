import {
  UPDATE_ROUND_SCORE,
  UPDATE_TOTAL_SCORE,
  END_ROUND,
} from "../actions/actionTypes";

const initialState = {
  roundScore: 1,
  totalScore: 1,
  level: 1,
  displayEndRound: false,
};
const gameReducer = (state = initialState, action) => {
  if (action.type === UPDATE_ROUND_SCORE) {
    return { ...state, roundScore: state.roundScore * action.value };
  }
  if (action.type === UPDATE_TOTAL_SCORE) {
    return { ...state, totalScore: action.value };
  }
  if (action.type === END_ROUND) {
    return { ...state, displayEndRound: true };
  }
  return state;
};
export default gameReducer;

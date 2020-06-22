import {
  UPDATE_ROUND_SCORE,
  UPDATE_TOTAL_SCORE,
  END_ROUND_LOSS,
  CHANGE_END_DIALOGUE,
  CLOSE_DIALOGUE_BOX,
  RESET_CLICKS,
} from "../actions/actionTypes";

const initialState = {
  roundScore: 1,
  totalScore: 1,
  level: 1,
  displayEndRound: false,
  dialogueText: "Oh no! You get 0 coins!",
  clicks: 0,
};
const gameReducer = (state = initialState, action) => {
  if (action.type === UPDATE_ROUND_SCORE) {
    return { ...state, roundScore: state.roundScore * action.value };
  }
  if (action.type === UPDATE_TOTAL_SCORE) {
    return { ...state, totalScore: action.value };
  }
  if (action.type === END_ROUND_LOSS) {
    return {
      ...state,
      displayEndRound: true,
      clicks: 0,

      dialogueText: "Oh no! You get 0 coins!",
    };
  }
  if (action.type === CHANGE_END_DIALOGUE) {
    return {
      ...state,
      dialogueText: "Resetting collected coins...",
      clicks: state.clicks + 1,
    };
  }
  if (action.type === CLOSE_DIALOGUE_BOX) {
    return {
      ...state,
      displayEndRound: false,
      clicks: state.clicks + 1,
      roundScore: 1,
    };
  }

  if (action.type === RESET_CLICKS) {
    return { ...state, clicks: 0 };
  }

  return state;
};
export default gameReducer;

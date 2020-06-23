import {
  UPDATE_ROUND_SCORE,
  UPDATE_TOTAL_SCORE,
  CLOSE_DIALOGUE_BOX,
  RESET_ROUND_SCORE,
  OPEN_DIALOGUE_BOX,
  TOGGLE_ROUND_INTERMISSION,
} from "../actions/actionTypes";

const initialState = {
  roundScore: 1,
  totalScore: 1,
  level: 1,
  displayDialogueBox: false,
  roundIntermission: false,
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

  if (action.type === OPEN_DIALOGUE_BOX) {
    return { ...state, displayDialogueBox: true, dialogueText: action.value };
  }

  if (action.type === TOGGLE_ROUND_INTERMISSION) {
    console.log(!state.roundIntermission);
    return { ...state, roundIntermission: !state.roundIntermission };
  }

  if (action.type === CLOSE_DIALOGUE_BOX) {
  }

  if (action.type === RESET_ROUND_SCORE) {
    return { ...state, roundScore: 1 };
  }

  return state;
};
export default gameReducer;

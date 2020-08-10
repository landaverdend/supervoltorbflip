import {
  UPDATE_ROUND_SCORE,
  UPDATE_TOTAL_SCORE,
  CLOSE_DIALOGUE_BOX,
  RESET_ROUND_SCORE,
  OPEN_DIALOGUE_BOX,
  CHANGE_DIALOGUE_TEXT,
  TOGGLE_ROUND_INTERMISSION,
  SET_CLICKS,
} from "../actions/actionTypes";

const initialState = {
  roundScore: 1,
  totalScore: 0,
  dialogueBoxOpen: false,
  roundIntermission: false,
  roundLost: false,
  clicks: 0,
  dialogueText: "",
};

const gameReducer = (state = initialState, action) => {
  if (action.type === UPDATE_ROUND_SCORE) {
    return { ...state, roundScore: state.roundScore * action.value };
  }
  if (action.type === UPDATE_TOTAL_SCORE) {
    return { ...state, totalScore: action.value };
  }

  if (action.type === OPEN_DIALOGUE_BOX) {
    return { ...state, dialogueBoxOpen: true, dialogueText: action.value };
  }

  if (action.type === CLOSE_DIALOGUE_BOX) {
    return { ...state, dialogueBoxOpen: false };
  }

  if (action.type === CHANGE_DIALOGUE_TEXT) {
    return { ...state, dialogueText: action.value };
  }

  if (action.type === TOGGLE_ROUND_INTERMISSION) {
    //action.value here is the new value for roundLost
    let newTotalScore = state.totalScore;

    if (!action.value) {
      //this is a hack to fix a stupid problem. Sorry.
      if (state.roundScore !== 1) {
        newTotalScore += state.roundScore;
      }
    }
    return {
      ...state,
      roundIntermission: !state.roundIntermission,
      roundLost: action.value,
      totalScore: newTotalScore,
      roundScore: 1,
    };
  }

  if (action.type === SET_CLICKS) {
    return { ...state, clicks: action.value };
  }

  if (action.type === RESET_ROUND_SCORE) {
    return { ...state, roundScore: 1 };
  }

  return state;
};
export default gameReducer;

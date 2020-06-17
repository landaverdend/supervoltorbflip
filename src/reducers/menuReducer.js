import { TOGGLE_MENU, CHANGE_VIEW } from "../actions/actionTypes";
const Views = {
  DEFAULT: 0,
  ABOUT: 1,
  RULES: 2,
  OPTIONS: 3,
  CONTROLS: 4,
  RESET: 5,
};

const initialState = {
  opened: false,
  view: 0,
};

const menuReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_MENU) {
    return { ...state, opened: !state.opened };
  }

  if (action.type === CHANGE_VIEW) {
    return { ...state, view: action.value };
  }

  return state;
};
export default menuReducer;

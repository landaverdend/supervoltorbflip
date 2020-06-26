import { TOGGLE_MENU, CHANGE_VIEW } from "../actions/actionTypes";

const initialState = {
  menuOpened: false,
  view: 0,
};

const menuReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_MENU) {
    return { ...state, menuOpened: !state.menuOpened };
  }

  if (action.type === CHANGE_VIEW) {
    return { ...state, view: action.value };
  }

  return state;
};
export default menuReducer;

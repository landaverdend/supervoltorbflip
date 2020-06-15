import { TOGGLE_MENU } from "../actions/actionTypes";

const initialState = {
  opened: false,
};

const menuReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_MENU) {
    return { ...state, opened: !state.opened };
  }

  return state;
};
export default menuReducer;

import { combineReducers } from "redux";
import boardReducer from "./boardReducer.js";
import gameReducer from "./gameReducer.js";
import menuReducer from "./menuReducer.js";

const RootReducer = combineReducers({
  boardReducer,
  gameReducer,
  menuReducer,
});

export default RootReducer;

import { combineReducers } from "redux";
import boardReducer from "./boardReducer.js";
import scoreReducer from "./scoreReducer.js";
import menuReducer from "./menuReducer.js";

const RootReducer = combineReducers({
  boardReducer,
  scoreReducer,
  menuReducer,
});

export default RootReducer;

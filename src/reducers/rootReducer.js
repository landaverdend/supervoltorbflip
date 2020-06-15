import { combineReducers } from "redux";
import boardReducer from "./boardReducer.js";
import scoreReducer from "./scoreReducer.js";

const RootReducer = combineReducers({ boardReducer, scoreReducer });

export default RootReducer;

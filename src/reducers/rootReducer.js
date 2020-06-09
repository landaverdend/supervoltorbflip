import { combineReducers } from "redux";
import boardReducer from "./boardReducer.js";

const RootReducer = combineReducers({ boardReducer });

export default RootReducer;

import React from "react";
import Board from "./components/board.jsx";
import ScoreBoard from "./components/scoreboard.jsx";
import OptionsMenu from "./components/optionsMenu";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RootReducer from "./reducers/rootReducer.js";
import { memoHandler } from "./game/keyHandlers";
import {
  UPDATE_CURRENT_TILE,
  TOGGLE_MENU,
  UPDATE_ROUND_SCORE,
  UPDATE_MEMOS,
  UPDATE_CLICKED,
  CHANGE_VIEW,
} from "./actions/actionTypes";
import "./styles/index.css";

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className={"flex-container"}>
        <ScoreBoard />
        <Board />
        {/* <OptionsMenu /> */}
      </div>
    </Provider>
  );
}

const handleKeyPress = (event) => {
  event.preventDefault();
  let grid = store.getState().boardReducer.grid;
  let currentTile = store.getState().boardReducer.currentTile;

  //arrow key.
  if (event.keyCode <= 40 && event.keyCode >= 37) {
    if (store.getState().menuReducer.opened) return;
    store.dispatch({
      type: UPDATE_CURRENT_TILE,
      eventInfo: { type: "key", keyCode: event.keyCode },
    });
  }

  //spacebar
  if (event.keyCode === 32) {
    if (currentTile[0] === -1 || currentTile[1] === -1) return;

    let tile = grid[currentTile[0]][currentTile[1]];
    if (!tile.clickable) return;

    store.dispatch({ type: UPDATE_CLICKED });

    store.dispatch({ type: UPDATE_ROUND_SCORE, value: tile.value });
  }

  if (event.keyCode === 27) {
    store.dispatch({ type: TOGGLE_MENU });
    // if (store.getState().menuReducer.view !== 0)
    //   store.dispatch({ type: CHANGE_VIEW, value: 0 });
  }
  // //f
  // if (event.keyCode === 70) {
  //   props.flipAll();
  // }
  let updateMemos = (eventInfo) =>
    store.dispatch({
      type: UPDATE_MEMOS,
      eventInfo: eventInfo,
    });

  memoHandler(event.keyCode, grid, currentTile, updateMemos);
};

document.addEventListener("keydown", handleKeyPress);

export default App;

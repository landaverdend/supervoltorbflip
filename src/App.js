import React from "react";
import Board from "./components/board.jsx";
import ScoreBoard from "./components/scoreboard";
import DialogueModal from "./components/dialogueModal";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RootReducer from "./reducers/rootReducer";
import { memoHandler } from "./game/keyHandlers";
import {
  UPDATE_CURRENT_TILE,
  TOGGLE_MENU,
  UPDATE_ROUND_SCORE,
  UPDATE_MEMOS,
  UPDATE_CLICKED,
  CHANGE_VIEW,
  END_ROUND_LOSS,
  CHANGE_END_DIALOGUE,
  CLOSE_DIALOGUE_BOX,
  FLIP_ALL,
  RESET_CLICKS,
  RESET_GRID,
  FLIP_ALL_UNCLICKED,
} from "./actions/actionTypes";
import "./styles/index.css";

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className={"flex-container"}>
        <ScoreBoard />
        <Board />
        <DialogueModal />
      </div>
    </Provider>
  );
}

//key handlers
const handleKeyPress = (event) => {
  event.preventDefault();
  let state = store.getState();
  let endOfRound = state.gameReducer.displayEndRound;

  //end of round.
  if (endOfRound && state.gameReducer.clicks === 0) {
    store.dispatch({ type: CHANGE_END_DIALOGUE });
    return;
  }
  //clicked once while dialogue is up
  if (endOfRound && state.gameReducer.clicks === 1) {
    store.dispatch({ type: CLOSE_DIALOGUE_BOX });
    store.dispatch({ type: FLIP_ALL });
    return;
  }
  //reset the board, wait a sec.
  if (!endOfRound && state.gameReducer.clicks === 2) {
    store.dispatch({ type: FLIP_ALL_UNCLICKED });
    store.dispatch({ type: RESET_CLICKS });
    setTimeout(() => {
      store.dispatch({ type: RESET_GRID });
    }, 250);
    return;
  }

  let grid = state.boardReducer.grid;
  let currentTile = state.boardReducer.currentTile;

  //arrow key.
  if (event.keyCode <= 40 && event.keyCode >= 37) {
    if (state.menuReducer.opened) return;
    store.dispatch({
      type: UPDATE_CURRENT_TILE,
      eventInfo: { type: "key", keyCode: event.keyCode },
    });
  }

  //spacebar
  if (event.keyCode === 32) {
    if (currentTile[0] === -1 || currentTile[1] === -1) return;

    let tile = grid[currentTile[0]][currentTile[1]];
    if (!tile.clickable) return; // this is here because you can hit space bar while moused over the outside tile. which fucks everything up.
    store.dispatch({ type: UPDATE_CLICKED });
    if (tile.value === 0) store.dispatch({ type: END_ROUND_LOSS });
    store.dispatch({ type: UPDATE_ROUND_SCORE, value: tile.value });
  }

  if (event.keyCode === 27) {
    store.dispatch({ type: TOGGLE_MENU });
  }
  let updateMemos = (eventInfo) =>
    store.dispatch({
      type: UPDATE_MEMOS,
      eventInfo: eventInfo,
    });

  memoHandler(event.keyCode, grid, currentTile, updateMemos);
};

const handleClick = (event) => {
  let state = store.getState();
  let endOfRound = state.gameReducer.displayEndRound;

  //end of round.
  if (endOfRound && state.gameReducer.clicks === 0) {
    store.dispatch({ type: CHANGE_END_DIALOGUE });
    return;
  }
  if (endOfRound && state.gameReducer.clicks === 1) {
    store.dispatch({ type: CLOSE_DIALOGUE_BOX });
    store.dispatch({ type: FLIP_ALL });
    return;
  }
  if (!endOfRound && state.gameReducer.clicks === 2) {
    store.dispatch({ type: FLIP_ALL_UNCLICKED });
    store.dispatch({ type: RESET_CLICKS });
    setTimeout(() => {
      store.dispatch({ type: RESET_GRID });
    }, 500);
    // store.dispatch({ type: RESET_GRID });
  }
};

document.addEventListener("keydown", handleKeyPress);
document.addEventListener("click", handleClick);
export default App;

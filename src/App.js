import React from "react";
import RootReducer from "./reducers/rootReducer";
import Board from "./components/board.jsx";
import ScoreBoard from "./components/scoreboard";
import DialogueModal from "./components/dialogueModal";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { memoHandler, dialogueHandler } from "./game/keyHandlers";
import {
  UPDATE_CURRENT_TILE,
  TOGGLE_MENU,
  UPDATE_ROUND_SCORE,
  UPDATE_MEMOS,
  UPDATE_CLICKED,
  TOGGLE_ROUND_INTERMISSION,
  OPEN_DIALOGUE_BOX,
  FLIP_COLUMN,
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

  if (event.keyCode === 76) {
    // let func = (num) => {
    //   store.dispatch({ type: FLIP_COLUMN, value: num });
    // };
    // setTimeout(() => func(0), 0);
    // setTimeout(() => func(1), 250);
    // setTimeout(() => func(2), 500);
    // setTimeout(() => func(3), 750);
    // setTimeout(() => func(4), 1000);
  }

  if (state.gameReducer.roundIntermission) {
    dialogueHandler(state, store.dispatch, event.keyCode);
    return;
  }

  let grid = state.boardReducer.grid;
  let currentTile = state.boardReducer.currentTile;

  //arrow key.
  if (event.keyCode <= 40 && event.keyCode >= 37) {
    if (state.menuReducer.menuOpened) return;

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
    if (tile.value === 0) {
      store.dispatch({
        type: OPEN_DIALOGUE_BOX,
        value: "Oh no, you get 0 coins!",
      });
      store.dispatch({ type: TOGGLE_ROUND_INTERMISSION });
    }
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
  let roundIntermission = state.gameReducer.roundIntermission;

  //make it so you can leave menu if you click out of modal
  if (state.menuReducer.menuOpened) {
    if (
      event.target === document.getElementsByClassName("modal show-modal")[0]
    ) {
      store.dispatch({ type: TOGGLE_MENU });
    }
  }
  if (roundIntermission) {
    dialogueHandler(state, store.dispatch);
  }
};

document.addEventListener("keydown", handleKeyPress);
document.addEventListener("click", handleClick);
export default App;

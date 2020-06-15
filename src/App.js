import React from "react";
import Board from "./components/board.jsx";
import ScoreBoard from "./components/scoreboard.jsx";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RootReducer from "./reducers/rootReducer.js";
import "./styles/index.css";

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className={"flex-container"}>
        <ScoreBoard />
        <Board />
      </div>
    </Provider>
  );
}

export default App;

import React from 'react';
import Board from './components/board.jsx';
import './styles/App.css';
import { Provider } from "react-redux";
import { createStore } from "redux";
import  RootReducer  from "./reducers/rootReducer.js";

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <Board/>
    </Provider>
  );
}

export default App;

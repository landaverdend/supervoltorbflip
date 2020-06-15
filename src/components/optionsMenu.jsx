import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/options.css";
import { TOGGLE_MENU, UPDATE_GRID } from "../actions/actionTypes";

const Views = {
  DEFAULT: 0,
  ABOUT: 1,
  RULES: 2,
  OPTIONS: 3,
  CONTROLS: 4,
  RESET: 5,
};

const OptionsMenu = (props) => {
  const [view, setView] = useState(Views.DEFAULT);

  return (
    <>
      <div class={props.opened ? "modal show-modal" : "modal"}>
        <div class="modal-content">
          <span
            class="close-button"
            onClick={() => {
              props.toggleMenu();
              setView(Views.DEFAULT);
            }}
          >
            X
          </span>
          {view === Views.DEFAULT ? (
            <ul>
              <li>About</li>
              <li>Rules</li>
              <li
                onClick={() => {
                  setView(Views.OPTIONS);
                }}
              >
                Options
              </li>
              <li>Controls</li>
              <li>Reset</li>
            </ul>
          ) : null}
          {view === Views.OPTIONS ? (
            <input
              type="range"
              defaultValue={props.dimension}
              min="4"
              max="10"
              onChange={(event) => {
                props.updateGrid(event.target.value);
              }}
              class="slider"
            ></input>
          ) : null}
        </div>
      </div>
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => dispatch({ type: TOGGLE_MENU }),
    updateGrid: (val) => dispatch({ type: UPDATE_GRID, value: val }),
  };
}

function mapStateToProps(state) {
  return {
    roundScore: state.scoreReducer.roundScore,
    totalScore: state.scoreReducer.totalScore,
    opened: state.menuReducer.opened,
    dimension: state.boardReducer.dimension,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);

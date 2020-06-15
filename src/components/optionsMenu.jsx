import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/options.css";
import { TOGGLE_MENU } from "../actions/actionTypes";

const OptionsMenu = (props) => {
  return (
    <>
      {/* <button class="trigger" onClick={props.toggleMenu}>
        CLICKME
      </button> */}
      <div class={props.opened ? "modal show-modal" : "modal"}>
        <div class="modal-content">
          <span class="close-button" onClick={props.toggleMenu}>
            X
          </span>
          <ul>
            <li>About</li>
            <li>Rules</li>
            <li>Options</li>
            <li>Controls</li>
            <li>Reset</li>
          </ul>
        </div>
      </div>
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => dispatch({ type: TOGGLE_MENU }),
  };
}

function mapStateToProps(state) {
  return {
    roundScore: state.scoreReducer.roundScore,
    totalScore: state.scoreReducer.totalScore,
    opened: state.menuReducer.opened,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);

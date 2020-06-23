import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/modal.css";
import { FLIP_ALL_UNCLICKED, FLIP_ALL } from "../actions/actionTypes";

const DialogueModal = (props) => {
  return (
    <div
      class={
        props.dialogueBoxOpen
          ? "dialogue-modal show-dialogue-modal"
          : "dialogue-modal"
      }
    >
      <div class="dialogue-modal-content">
        <span className={"dialogue-text"}>{props.dialogueText} </span>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    flipAll: () => dispatch({ type: FLIP_ALL }),
    flipAllUnclicked: () => dispatch({ type: FLIP_ALL_UNCLICKED }),
  };
}

function mapStateToProps(state) {
  return {
    dialogueText: state.gameReducer.dialogueText,
    dialogueBoxOpen: state.gameReducer.dialogueBoxOpen,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueModal);

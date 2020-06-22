import React from "react";
import { connect } from "react-redux";
import "../styles/modal.css";

const DialogueModal = (props) => {
  return (
    <div
      class={
        props.displayEndRound
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

function mapStateToProps(state) {
  return {
    displayEndRound: state.gameReducer.displayEndRound,
    dialogueText: state.gameReducer.dialogueText,
  };
}

export default connect(mapStateToProps)(DialogueModal);

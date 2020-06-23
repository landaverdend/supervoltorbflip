import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/modal.css";
import {
  FLIP_ALL_UNCLICKED,
  FLIP_ALL,
  RESET_GRID,
  CLOSE_DIALOGUE_BOX,
  OPEN_DIALOGUE_BOX,
  RESET_ROUND_SCORE,
  TOGGLE_ROUND_INTERMISSION,
} from "../actions/actionTypes";

const DialogueModal = (props) => {
  // const [clicks, setClicks] = useState(0);
  const clicks = props.clicks;

  const handleEndRoundLoss = () => {};

  if (props.roundIntermission) {
    console.log("here");
    document.addEventListener("click", handleEndRoundLoss);
    document.addEventListener("keydown", handleEndRoundLoss);
  } else {
    console.log("gone");
    document.removeEventListener("click", handleEndRoundLoss);
    document.removeEventListener("keydown", handleEndRoundLoss);
  }

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

function mapDispatchToProps(dispatch) {
  return {
    flipAll: () => dispatch({ type: FLIP_ALL }),
    flipAllUnclicked: () => dispatch({ type: FLIP_ALL_UNCLICKED }),
  };
}

function mapStateToProps(state) {
  return {
    displayEndRound: state.gameReducer.displayEndRound,
    dialogueText: state.gameReducer.dialogueText,
    clicks: state.gameReducer.clicks,
    roundIntermission: state.gameReducer.roundIntermission,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueModal);

import React from "react";
import { connect } from "react-redux";
import "../styles/modal.css";

const DialogueModal = (props) => {
  return (
    <div className={"modal"}>
      <div class="container">
        <div className={"modal-content animate"}>heyo</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    displayEndRound: state.gameReducer.displayEndRound,
  };
}

export default connect(mapStateToProps)(DialogueModal);

import React from "react";
import { connect } from "react-redux";

const DialogueModal = (props) => {
  return <div>{props.displayEndRound ? <div>you lose</div> : null}</div>;
};

function mapStateToProps(state) {
  return {
    displayEndRound: state.gameReducer.displayEndRound,
  };
}

export default connect(mapStateToProps)(DialogueModal);

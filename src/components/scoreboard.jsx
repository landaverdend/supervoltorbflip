import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/scoreboard.css";

const ScoreBoard = (props) => {
  const padNumber = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  return (
    <div>
      <div className={"score"}>
        Current Score: {padNumber(props.currentScore, 6)}
      </div>
      <div className={"score"}>
        Total Score: {padNumber(props.totalScore, 6)}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentScore: state.scoreReducer.currentScore,
    totalScore: state.scoreReducer.totalScore,
  };
}
export default connect(mapStateToProps)(ScoreBoard);

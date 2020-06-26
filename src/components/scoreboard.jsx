import React from "react";
import { connect } from "react-redux";
import "../styles/scoreboard.css";

const ScoreBoard = (props) => {
  const padNumber = (num, size) => {
    var s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
  };
  let formattedRS = padNumber(props.roundScore, 6);
  let formattedTS = padNumber(props.totalScore, 6);

  const toImageArray = (stringFormat) => {
    let imageArray = [];
    for (let i = 0; i < 6; i++) {
      imageArray.push(
        <img
          key={"image" + i}
          src={require("../assets/scoreboard/score" +
            stringFormat.charAt(i) +
            ".png")}
          alt={""}
        ></img>
      );
    }
    return imageArray;
  };

  return (
    <div className="score-container">
      <div className="level-box">
        <div className="score-text">Current Level:</div>
        <img
          src={require("../assets/scoreboard/score" + props.level + ".png")}
          alt={""}
        ></img>
      </div>
      <div className={"score"} id={"score1"}>
        <div className={"score-text"}>Round Score:</div>{" "}
        {toImageArray(formattedRS)}
      </div>
      <br></br>
      <div className={"score"} id={"score2"}>
        <div className="score-text">Total Score:</div>{" "}
        {toImageArray(formattedTS)}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    roundScore: state.gameReducer.roundScore,
    totalScore: state.gameReducer.totalScore,
    level: state.boardReducer.level,
  };
}
export default connect(mapStateToProps)(ScoreBoard);

import { connect } from "react-redux";
import React from "react";
import "../styles/board.css";
import OptionsMenu from "./optionsMenu";
import {
  FLIP_ALL,
  UPDATE_CLICKED,
  UPDATE_CURRENT_TILE,
  UPDATE_MEMOS,
  UPDATE_ROUND_SCORE,
  UPDATE_TOTAL_SCORE,
  TOGGLE_ROUND_INTERMISSION,
  OPEN_DIALOGUE_BOX,
} from "../actions/actionTypes.js";
import BoardTile from "./boardTile";

const Board = (props) => {
  let grid = props.grid;
  //set the CSS variable, this should reset each time the grid is re rendered.
  let htmlStyles = window.getComputedStyle(document.querySelector("html"));
  let cssDim = parseInt(htmlStyles.getPropertyValue("--dimension"));
  if (cssDim !== props.dimension)
    document.documentElement.style.setProperty("--dimension", props.dimension);

  //helper method to map each grid value to a board tile component.
  const constructTileGrid = () => {
    let temp = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        temp.push(
          <BoardTile
            key={i + " " + j}
            row={i}
            col={j} //indices of this tile
            value={grid[i][j].value} //value of tile.
            clickable={grid[i][j].clickable}
            clicked={grid[i][j].clicked}
            setClicked={props.setClicked}
            updateCurrentTile={props.updateCurrentTile}
            currentTile={props.currentTile}
            pointSum={grid[i][j].pointSum}
            bombCount={grid[i][j].bombCount}
            memos={grid[i][j].memos}
            updateMemos={props.updateMemos}
            updateRoundScore={props.updateRoundScore}
            flipAll={props.flipAll}
            openDialogueBox={props.openDialogueBox}
            toggleRound={props.toggleRound}
            roundIntermission={props.roundIntermission}
            roundScore={props.roundScore}
            maxRoundPoints={props.maxRoundPoints}
          />
        );
      }
    }
    temp.push(<OptionsMenu key={"options"} />);
    return temp;
  };

  return (
    <div
      className="grid-container"
      draggable={"false"}
      // need to enable tab index to get key press working.
      tabIndex={0}
    >
      {constructTileGrid()}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dimension: state.boardReducer.dimension,
    grid: state.boardReducer.grid,
    currentTile: state.boardReducer.currentTile,
    roundScore: state.gameReducer.roundScore,
    totalScore: state.gameReducer.totalScore,
    menuOpened: state.menuReducer.menuOpened,
    roundIntermission: state.gameReducer.roundIntermission,
    maxRoundPoints: state.boardReducer.maxRoundPoints,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClicked: () => dispatch({ type: UPDATE_CLICKED }),
    flipAll: () => dispatch({ type: FLIP_ALL }),
    updateCurrentTile: (eventInfo) =>
      dispatch({
        type: UPDATE_CURRENT_TILE,
        eventInfo: eventInfo,
      }),
    updateMemos: (eventInfo) =>
      dispatch({ type: UPDATE_MEMOS, eventInfo: eventInfo }),
    updateRoundScore: (val) =>
      dispatch({ type: UPDATE_ROUND_SCORE, value: val }),
    updateTotalScore: (val) => {
      dispatch({ type: UPDATE_TOTAL_SCORE, value: val });
    },
    toggleRound: (val) =>
      dispatch({ type: TOGGLE_ROUND_INTERMISSION, value: val }),
    openDialogueBox: (val) => dispatch({ type: OPEN_DIALOGUE_BOX, value: val }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);

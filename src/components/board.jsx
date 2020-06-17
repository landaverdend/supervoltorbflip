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
  TOGGLE_MENU,
} from "../actions/actionTypes.js";
import BoardTile from "./boardTile";

const Board = (props) => {
  let grid = props.grid;
  //set the CSS variable, this should reset each time the grid is re rendered.
  let htmlStyles = window.getComputedStyle(document.querySelector("html"));
  let cssDim = parseInt(htmlStyles.getPropertyValue("--dimension"));
  if (cssDim !== props.dimension)
    document.documentElement.style.setProperty("--dimension", props.dimension);

  // const handleKeyPress = (event) => {
  //   event.preventDefault();

  //   //arrow key.
  //   if (event.keyCode <= 40 && event.keyCode >= 37) {
  //     if (props.opened) return;
  //     props.updateCurrentTile({ type: "key", keyCode: event.keyCode });
  //   }
  //   //spacebar
  //   if (event.keyCode === 32) {
  //     props.setClicked();
  //     props.updateRoundScore(
  //       grid[props.currentTile[0]][props.currentTile[1]].value
  //     );
  //   }
  //   if (event.keyCode === 27) {
  //     props.toggleMenu();
  //   }
  //   //f
  //   if (event.keyCode === 70) {
  //     props.flipAll();
  //   }
  //   if (event.keyCode === 85) {
  //     props.updateRoundScore(props.roundScore * 2);
  //     props.updateTotalScore(props.totalScore * 3);
  //   }
  //   memoHandler(event.keyCode, grid, props.currentTile, props.updateMemos);
  // };

  //helper method to map each grid value to a board tile component.
  const constructTileGrid = () => {
    let temp = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        temp.push(
          <BoardTile
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
          />
        );
      }
    }
    temp.push(<OptionsMenu />);
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
    roundScore: state.scoreReducer.roundScore,
    totalScore: state.scoreReducer.totalScore,
    opened: state.menuReducer.opened,
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
    toggleMenu: () => dispatch({ type: TOGGLE_MENU }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);

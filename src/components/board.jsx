import { connect } from "react-redux";
import React from "react";
import "../styles/board.css";
import {
  FLIP_ALL,
  UPDATE_CLICKED,
  UPDATE_CURRENT_TILE,
} from "../actions/actionTypes.js";
import BoardTile from "./boardTile.jsx";

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
          />
        );
      }
    }
    return temp;
  };

  return (
    <div
      className="grid-container"
      draggable={"false"}
      // need to enable tab index to get key press working.
      tabIndex={0}
      onKeyDown={(event) => {
        event.preventDefault();
        //arrow key.
        if (event.keyCode <= 40 && event.keyCode >= 37) {
          props.updateCurrentTile({ type: "key", keyCode: event.keyCode });
        }

        //spacebar
        if (event.keyCode === 32) {
          props.setClicked();
        }
        //esc
        if (event.keyCode == 27) {
          props.flipAll();
        }
      }}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);

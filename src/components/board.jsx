import { connect } from "react-redux";
import React from "react";
import "../styles/board.css";
import { memoHandler } from "../game/keyHandlers";
import {
  FLIP_ALL,
  UPDATE_CLICKED,
  UPDATE_CURRENT_TILE,
  UPDATE_MEMOS,
} from "../actions/actionTypes.js";
import BoardTile from "./boardTile.jsx";

const Board = (props) => {
  let grid = props.grid;
  //set the CSS variable, this should reset each time the grid is re rendered.
  let htmlStyles = window.getComputedStyle(document.querySelector("html"));
  let cssDim = parseInt(htmlStyles.getPropertyValue("--dimension"));
  if (cssDim !== props.dimension)
    document.documentElement.style.setProperty("--dimension", props.dimension);

  const handleKeyPress = (event) => {
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
    if (event.keyCode === 27) {
      props.flipAll();
    }

    memoHandler(event.keyCode, grid, props.currentTile, props.updateMemos);
    // //tilde
    // if (event.keyCode === 192 && good) {
    //   let memos = grid[props.currentTile[0]][props.currentTile[1]].memos;
    //   if (memos !== undefined)
    //     props.updateMemos({ ...memos, BOMB: !memos.BOMB });
    // }
    // //one key
    // if (event.keyCode === 49 && good) {
    //   let memos = grid[props.currentTile[0]][props.currentTile[1]].memos;
    //   if (memos !== undefined) props.updateMemos({ ...memos, ONE: !memos.ONE });
    // }
    // if (event.keyCode === 50 && good) {
    //   let memos = grid[props.currentTile[0]][props.currentTile[1]].memos;
    //   if (memos !== undefined) props.updateMemos({ ...memos, TWO: !memos.TWO });
    // }
    // if (event.keyCode === 51 && good) {
    //   let memos = grid[props.currentTile[0]][props.currentTile[1]].memos;
    //   if (memos !== undefined)
    //     props.updateMemos({ ...memos, THREE: !memos.THREE });
    // }
  };
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
        handleKeyPress(event);
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
    updateMemos: (eventInfo) =>
      dispatch({ type: UPDATE_MEMOS, eventInfo: eventInfo }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);

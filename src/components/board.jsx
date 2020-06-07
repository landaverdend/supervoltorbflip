import { connect } from "react-redux";
import React from "react";
import "../styles/board.css";
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
            val={grid[i][j].value} //value of tile.
            clickable={grid[i][j].clickable}
          />
        );
      }
    }
    return temp;
  };

  const handleRightClick = (event) => {
    //event.preventDefault();
  };

  return (
    <div
      className="grid-container"
      onContextMenu={(event) => {
        handleRightClick(event);
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
  };
}

export default connect(mapStateToProps)(Board);

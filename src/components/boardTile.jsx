import React, { useState } from "react";
import MemoIcon from "./memoIcon";

import "../styles/board.css";

const BoardTile = (props) => {
  //local states for this stuff.
  const row = props.row;
  const col = props.col;
  const clicked = props.clicked;
  const [memos, setMemos] = useState({
    BOMB: false,
    ONE: false,
    TWO: false,
    THREE: false,
  });

  const checkCurrent = () => {
    return props.currentTile[0] === row && props.currentTile[1] === col;
  };

  const resetMemos = () => {
    setMemos({ BOMB: false, ONE: false, TWO: false, THREE: false });
  };

  return (
    <div
      className={"grid-item"}
      onContextMenu={(event) => {
        event.preventDefault();
        if (props.clickable && !clicked)
          setMemos({ ...memos, BOMB: !memos.BOMB });
      }}
      onClick={() => {
        if (props.clickable) {
          props.setClicked(row, col);
        }
        resetMemos();
      }}
      onMouseEnter={(event) => {
        props.updateCurrentTile({ type: "mouse", row: row, col: col });
        // handleMouseOver(true);
      }}
      onMouseLeave={(event) => {
        props.updateCurrentTile({ type: "mouse", row: -1, col: -1 });
      }}
    >
      <div className="container">
        {props.clickable ? (
          //clickable tile
          <div className={clicked ? "card flipped" : "card"}>
            <div className={"front"}>
              <MemoIcon memoState={memos} />
              <img
                src={
                  checkCurrent()
                    ? require("../assets/tileHover.png")
                    : require("../assets/tile.png")
                }
                draggable={"false"}
              ></img>
            </div>
            <div className="back">
              <img
                src={
                  checkCurrent()
                    ? require("../assets/clickedicons/clickedTileHover" +
                        props.value +
                        ".png")
                    : require("../assets/clickedicons/clicked" +
                        props.value +
                        ".png")
                }
                draggable={"false"}
              ></img>
            </div>
          </div>
        ) : (
          //outside tile
          <>
            <img
              src={require("../assets/outsideTiles/outsideTile" +
                ((props.row + props.col) % 5) +
                ".png")}
              alt={""}
              draggable={"false"}
            ></img>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardTile;

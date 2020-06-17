import React, { useState } from "react";
import MemoIcon from "./memoIcon";
import OutsideTile from "./outsideTile";

import "../styles/board.css";

const BoardTile = (props) => {
  //local states for this stuff.
  const row = props.row;
  const col = props.col;
  const clicked = props.clicked;
  const memos = props.memos;
  const checkCurrent = () => {
    return props.currentTile[0] === row && props.currentTile[1] === col;
  };

  return (
    <div
      className={"grid-item"}
      onContextMenu={(event) => {
        event.preventDefault();
        if (props.clickable && !clicked)
          props.updateMemos({ ...memos, BOMB: !props.memos.BOMB });
      }}
      onClick={() => {
        if (props.clickable) {
          if (props.value === 0) {
            props.endRound("bomb");
          }
          props.setClicked();
          props.updateRoundScore(props.value);
        }
      }}
      onMouseEnter={() => {
        props.updateCurrentTile({ type: "mouse", row: row, col: col });
      }}
      onMouseLeave={() => {
        props.updateCurrentTile({ type: "mouse", row: -1, col: -1 });
      }}
    >
      <div className="container">
        {props.clickable ? (
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
          <OutsideTile
            row={props.row}
            col={props.col}
            pointSum={props.pointSum}
            bombCount={props.bombCount}
          />
        )}
      </div>
    </div>
  );
};

export default BoardTile;

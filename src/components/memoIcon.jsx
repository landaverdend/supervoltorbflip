import React from "react";
import "../styles/memo.css";

const MemoIcon = (props) => {
  let memos = props.memoState;
  return (
    <>
      {memos.BOMB ? (
        <img
          id="bombIcon"
          src={require("../assets/memoIcons/memoBomb.png")}
        ></img>
      ) : (
        ""
      )}
      {memos.ONE ? (
        <img id="oneIcon" src={require("../assets/memoIcons/memo1.png")}></img>
      ) : (
        ""
      )}
      {memos.TWO ? (
        <img id="twoIcon" src={require("../assets/memoIcons/memo2.png")}></img>
      ) : (
        ""
      )}
      {memos.THREE ? (
        <img
          id="threeIcon"
          src={require("../assets/memoIcons/memo3.png")}
        ></img>
      ) : (
        ""
      )}
    </>
  );
};

export default MemoIcon;

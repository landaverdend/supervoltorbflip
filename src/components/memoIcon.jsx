import React from "react";
import "../styles/memo.css";

const MemoIcon = (props) => {
  let memos = props.memoState;
  return (
    <>
      {memos.BOMB && !props.clicked ? (
        <img
          id="bombIcon"
          src={require("../assets/memoIcons/memoBomb.png")}
          alt={""}
        ></img>
      ) : (
        ""
      )}
      {memos.ONE && !props.clicked ? (
        <img
          id="oneIcon"
          alt={""}
          src={require("../assets/memoIcons/memo1.png")}
        ></img>
      ) : (
        ""
      )}
      {memos.TWO && !props.clicked ? (
        <img
          id="twoIcon"
          alt={""}
          src={require("../assets/memoIcons/memo2.png")}
        ></img>
      ) : (
        ""
      )}
      {memos.THREE && !props.clicked ? (
        <img
          id="threeIcon"
          alt={""}
          src={require("../assets/memoIcons/memo3.png")}
        ></img>
      ) : (
        ""
      )}
    </>
  );
};

export default MemoIcon;

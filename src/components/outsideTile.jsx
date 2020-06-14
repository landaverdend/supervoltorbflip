import React from "react";

const OutsideTile = (props) => {
  let pointString = props.pointSum + "";

  return (
    <>
      <img
        src={require("../assets/outsideTiles/outsideTile" +
          ((props.row + props.col) % 5) +
          ".png")}
        alt={""}
        draggable={"false"}
      ></img>
      <img
        id="points"
        src={require("../assets/outsideCount/count" + pointString + ".png")}
      ></img>
      <img
        id="bombCount"
        src={require("../assets/outsideCount/count" + props.bombCount + ".png")}
      ></img>
    </>
  );
};

export default OutsideTile;

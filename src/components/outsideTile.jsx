import React from "react";

const OutsideTile = (props) => {
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
        src={require("../assets/outsideCount/count" + props.pointSum + ".png")}
      ></img>
    </>
  );
};

export default OutsideTile;

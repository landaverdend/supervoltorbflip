import React from "react";

const OutsideTile = (props) => {
  let pointString = props.pointSum + "";
  //digit one corresponds to the tens place.
  let tens;
  let ones;
  props.pointSum < 10 ? (tens = 0) : (tens = pointString.charAt(0));
  props.pointSum < 10
    ? (ones = pointString.charAt(0))
    : (ones = pointString.charAt(1));
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
        id="digitOne"
        src={require("../assets/outsideCount/count" + ones + ".png")}
        alt={""}
      ></img>
      <img
        id="digitTwo"
        alt={""}
        src={require("../assets/outsideCount/count" + tens + ".png")}
      ></img>
      <img
        id="bombCount"
        src={require("../assets/outsideCount/count" + props.bombCount + ".png")}
        alt={""}
      ></img>
    </>
  );
};

export default OutsideTile;

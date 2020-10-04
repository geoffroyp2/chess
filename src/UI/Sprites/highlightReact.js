import React from "react";

import getSVG from "./helpers/getSVG";
import getZIndex from "./helpers/getZIndex";

const Highlight = ({ size, type }) => {
  return (
    <img
      src={getSVG(type)}
      alt=""
      style={{
        position: "absolute",
        height: size,
        width: size,
        zIndex: getZIndex(type),
      }}
    ></img>
  );
};
export default Highlight;

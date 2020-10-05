import React from "react";

import getSVG from "./helpers/getSVG";
import getZIndex from "./helpers/getZIndex";

const Highlight = ({ size, type, coord }) => {
  return (
    <img
      className="Highlight"
      src={getSVG(type)}
      alt=""
      style={{
        position: "absolute",
        height: size,
        width: size,
        left: `${coord.x * size}px`,
        top: `${coord.y * size}px`,
        zIndex: getZIndex(type),
      }}
    ></img>
  );
};
export default Highlight;

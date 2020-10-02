import React from "react";
import getSVG from "./getSVG";

const Highlight = ({ size, type, coord }) => {
  return (
    <img
      className="Highlight"
      src={getSVG(type)}
      style={{
        zIndex: 3,
        height: size,
        width: size,
        top: `${coord.y * size}px`,
        left: `${coord.x * size}px`,
      }}
      alt=""
    />
  );
};
export default Highlight;

import React from "react";
import getSVG from "./getSVG";

const Piece = ({ size, type, coord }) => {
  return (
    <img
      className="Piece"
      src={getSVG(type)}
      style={{
        zIndex: 5,
        height: size,
        width: size,
        top: `${coord.y * size}px`,
        left: `${coord.x * size}px`,
      }}
      alt=""
    />
  );
};
export default Piece;

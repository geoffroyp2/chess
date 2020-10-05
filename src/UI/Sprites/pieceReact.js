import React from "react";
import getSVG from "./helpers/getSVG";

const Piece = ({ size, type, coord }) => {
  return (
    <img
      className="Piece"
      src={getSVG(type)}
      style={{
        position: "absolute",
        height: size,
        width: size,
        left: `${coord.x * size}px`,
        top: `${coord.y * size}px`,
        zIndex: 16,
      }}
      alt=""
    />
  );
};
export default Piece;

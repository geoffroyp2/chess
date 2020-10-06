import React from "react";
import getSVG from "../helpers/getSVG";

const Piece = ({ size, type, coord }) => {
  return (
    <img
      className="Piece"
      src={getSVG(type)}
      style={{
        position: "absolute",
        height: size,
        width: size,
        transform: `translate(${coord.x * size}px, ${coord.y * size}px)`,
        zIndex: 16,
      }}
      alt=""
    />
  );
};
export default Piece;

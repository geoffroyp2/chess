import React from "react";
import getSVG from "./getSVG";
import "./style.css";

const Piece = ({ size, type, coord }) => {
  return (
    <img
      className="Piece"
      src={getSVG(type)}
      style={{
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

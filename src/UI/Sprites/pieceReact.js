import React from "react";
import getSVG from "./helpers/getSVG";
import "./style.css";

const Piece = ({ size, type, coord }) => {
  return (
    <img
      className="Piece"
      src={getSVG(type)}
      style={{
        height: size,
        width: size,
      }}
      alt=""
    />
  );
};
export default Piece;

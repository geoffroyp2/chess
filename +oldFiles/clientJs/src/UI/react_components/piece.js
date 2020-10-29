import React, { memo } from "react";
import getSVG from "../helpers/getSVG";

const Piece = memo(({ size, type, x, y, dragging, dragPosition }) => {
  return (
    <>
      {/* Base image : becomes a ghost at 0.5 opacity when dragging*/}
      <img
        className="Piece"
        src={getSVG(type)}
        style={{
          position: "absolute",
          height: size,
          width: size,
          top: `${y * size}px`,
          left: `${x * size}px`,
          zIndex: 16,
          opacity: `${dragging ? 0.5 : 1}`,
        }}
        alt=""
      />
      {/* Follows the cursor when dragging */}
      {dragging && (
        <img
          className="Piece"
          src={getSVG(type)}
          style={{
            position: "absolute",
            height: size,
            width: size,
            top: `${dragPosition[1]}px`,
            left: `${dragPosition[0]}px`,
            zIndex: 17,
          }}
          alt=""
        />
      )}
    </>
  );
});
export default Piece;

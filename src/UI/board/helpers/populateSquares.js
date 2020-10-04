import React from "react";

import getCoord from "./getCoord";
import Square from "../square";

export default function populateSquares(
  size,
  boardOrientation,
  pieces,
  highlights,
  squareClick
) {
  const squares = [];
  pieces.forEach((p) => {
    squares.push({
      coord: getCoord(p.coord, boardOrientation),
      piece: p,
      hoverableHighlight: null,
      normalHighlight: null,
    });
  });
  highlights.forEach((h) => {
    const hCoord = getCoord(h.coord, boardOrientation);
    const existingSquare = squares.find(
      (s) => s.coord.x === hCoord.x && s.coord.y === hCoord.y
    );
    if (existingSquare) {
      if (h.type === "HX" || h.type === "HM")
        existingSquare.hoverableHighlight = h;
      else existingSquare.normalHighlight = h;
    } else {
      squares.push({
        coord: getCoord(h.coord, boardOrientation),
        piece: null,
        hoverableHighlight: h.type === "HX" || h.type === "HM" ? h : null,
        normalHighlight: h.type === "HX" || h.type === "HM" ? null : h,
      });
    }
  });

  return squares.map((s) => (
    <Square
      size={size}
      params={s}
      squareClick={squareClick}
      key={"" + s.coord.x + s.coord.y}
    />
  ));
}

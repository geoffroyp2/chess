import React from "react";

import generateOverlaySVG from "./generateOverlaySVG.js";

import Piece from "../Sprites/pieceReact";
import "./style.css";

const PromotionArea = ({ coord, size }) => {
  const team = coord.y === 0 ? "W" : "B";
  const direction = coord.y === 0 ? +1 : -1;

  return (
    <div className="PromotionArea">
      {generateOverlaySVG(coord.x, coord.y === 0 ? 0 : 4)}
      <Piece
        size={size}
        type={"Q" + team}
        coord={{ x: coord.x, y: coord.y }}
        key={"PQ" + team}
      />
      <Piece
        size={size}
        type={"R" + team}
        coord={{ x: coord.x, y: coord.y + direction }}
        key={"PR" + team}
      />
      <Piece
        size={size}
        type={"N" + team}
        coord={{ x: coord.x, y: coord.y + 2 * direction }}
        key={"PN" + team}
      />
      <Piece
        size={size}
        type={"B" + team}
        coord={{ x: coord.x, y: coord.y + 3 * direction }}
        key={"PB" + team}
      />
    </div>
  );
};
export default PromotionArea;

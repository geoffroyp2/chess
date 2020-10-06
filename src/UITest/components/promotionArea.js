import React from "react";

import Piece from "./piece";

import generateOverlaySVG from "../helpers/generateOverlaySVG.js";

const PromotionArea = ({ data: { pieceCoord, graphicsCoord }, size }) => {
  const team = pieceCoord.y === 0 ? "W" : "B";
  const direction = graphicsCoord.y === 0 ? +1 : -1;

  return (
    <div className="PromotionArea" style={{ position: "absolute", zIndex: 16 }}>
      {generateOverlaySVG(graphicsCoord.x, graphicsCoord.y === 0 ? 0 : 4)}
      <Piece
        size={size}
        type={"Q" + team}
        coord={{ x: graphicsCoord.x, y: graphicsCoord.y }}
        key={"PQ" + team}
      />
      <Piece
        size={size}
        type={"R" + team}
        coord={{ x: graphicsCoord.x, y: graphicsCoord.y + direction }}
        key={"PR" + team}
      />
      <Piece
        size={size}
        type={"N" + team}
        coord={{ x: graphicsCoord.x, y: graphicsCoord.y + 2 * direction }}
        key={"PN" + team}
      />
      <Piece
        size={size}
        type={"B" + team}
        coord={{ x: graphicsCoord.x, y: graphicsCoord.y + 3 * direction }}
        key={"PB" + team}
      />
    </div>
  );
};
export default PromotionArea;

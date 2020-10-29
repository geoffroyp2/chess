import React, { memo } from "react";
import { Coordinate, PieceType } from "../../TSInterfaces/boardData";
import { getPieceSVG } from "../utils/getSVG";

interface Props {
  pieceSize: number;
  pieceType: PieceType;
  pieceTeam: boolean;
  coord: Coordinate;
  dragPosition?: Coordinate | null;
}

const PieceComponent = memo(({ pieceSize, pieceType, pieceTeam, coord, dragPosition }: Props) => {
  return (
    <>
      {/* Base image : becomes a ghost at 0.5 opacity when dragging*/}
      <img
        className="Piece"
        src={getPieceSVG(pieceType, pieceTeam)}
        style={{
          position: "absolute",
          height: pieceSize,
          width: pieceSize,
          top: `${coord.y * pieceSize}px`,
          left: `${coord.x * pieceSize}px`,
          zIndex: 16,
          opacity: `${dragPosition ? 0.5 : 1}`,
        }}
        alt=""
      />
      {/* Follows the cursor when dragging */}
      {dragPosition && (
        <img
          className="Piece"
          src={getPieceSVG(pieceType, pieceTeam)}
          style={{
            position: "absolute",
            height: pieceSize,
            width: pieceSize,
            top: `${dragPosition.y}px`,
            left: `${dragPosition.x}px`,
            zIndex: 17,
          }}
          alt=""
        />
      )}
    </>
  );
});
export default PieceComponent;

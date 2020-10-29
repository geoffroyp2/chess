import React, { memo } from "react";
import { Coordinate } from "../../TSInterfaces/boardData";
import { PieceUI } from "../../TSInterfaces/reactInterfaces";

import PieceComponent from "./pieceComponent";

interface Props {
  pieces: PieceUI[];
  pieceSize: number;
  pieceDragged: PieceUI | null;
  dragPosition: Coordinate | null;
}

const PiecesContainer = memo(({ pieces, pieceSize, pieceDragged, dragPosition }: Props) => {
  return (
    <>
      {pieces.map((p) => (
        <PieceComponent
          pieceSize={pieceSize}
          pieceType={p.Type}
          pieceTeam={p.Team}
          coord={p.Coord}
          dragPosition={pieceDragged && p.Coord.x === pieceDragged.Coord.x && p.Coord.y === pieceDragged.Coord.y ? dragPosition : null}
          key={"" + p.Type + p.Team + p.Coord.x + p.Coord.y}
        />
      ))}
    </>
  );
});

export default PiecesContainer;

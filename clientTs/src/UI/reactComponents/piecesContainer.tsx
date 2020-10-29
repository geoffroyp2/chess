import React, { memo } from "react";
import { Coordinate, Piece } from "../../TSInterfaces/boardData";

import PieceComponent from "./pieceComponent";

interface Props {
  pieces: Piece[];
  pieceSize: number;
  pieceDragged: Piece | null;
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

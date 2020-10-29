import { BoardState, Piece, PieceType } from "../../TSInterfaces/boardData";

const createPiece = (type: PieceType, team: boolean, x: number, y: number, castle?: boolean, ep?: boolean): Piece => {
  return {
    Type: type,
    Team: team,
    EP: ep || false,
    Castle: castle || false,
    Coord: {
      x: x,
      y: y,
    },
    Moves: [],
  };
};

export default function generatePosition(mode: string): BoardState {
  let position: BoardState = {
    PlayerTurn: true,
    Check: false,
    Checkmate: false,
    Stalemate: false,
    Pieces: [],
  };

  if (mode === "DEFAULT") {
    position.Pieces.push(createPiece(PieceType.Rook, true, 0, 7, true));
    position.Pieces.push(createPiece(PieceType.Knight, true, 1, 7));
    position.Pieces.push(createPiece(PieceType.Bishop, true, 2, 7));
    position.Pieces.push(createPiece(PieceType.Queen, true, 3, 7));
    position.Pieces.push(createPiece(PieceType.King, true, 4, 7, true));
    position.Pieces.push(createPiece(PieceType.Bishop, true, 5, 7));
    position.Pieces.push(createPiece(PieceType.Knight, true, 6, 7));
    position.Pieces.push(createPiece(PieceType.Rook, true, 7, 7, true));
    for (let i = 0; i < 8; i++) position.Pieces.push(createPiece(PieceType.Pawn, true, i, 6));

    position.Pieces.push(createPiece(PieceType.Rook, false, 0, 0, true));
    position.Pieces.push(createPiece(PieceType.Knight, false, 1, 0));
    position.Pieces.push(createPiece(PieceType.Bishop, false, 2, 0));
    position.Pieces.push(createPiece(PieceType.Queen, false, 3, 0));
    position.Pieces.push(createPiece(PieceType.King, false, 4, 0, true));
    position.Pieces.push(createPiece(PieceType.Bishop, false, 5, 0));
    position.Pieces.push(createPiece(PieceType.Knight, false, 6, 0));
    position.Pieces.push(createPiece(PieceType.Rook, false, 7, 0, true));
    for (let i = 0; i < 8; i++) position.Pieces.push(createPiece(PieceType.Pawn, false, i, 1));
  } else if (mode === "TEST") {
    position.Pieces.push(createPiece(PieceType.Queen, true, 3, 7));
    position.Pieces.push(createPiece(PieceType.King, true, 4, 7, true));

    position.Pieces.push(createPiece(PieceType.Queen, false, 3, 0));
    position.Pieces.push(createPiece(PieceType.King, false, 4, 0, true));
  }

  return position;
}

import Piece from "./piece";
import Coord from "../helpers/coordinates";

export default class King extends Piece {
  constructor(...args) {
    super(args);
    this.type = "K";
    this.canCastle = true;
  }

  copy() {
    const newPiece = new King(...super.getInfos());
    newPiece.canCastle = this.canCastle;
    return newPiece;
  }

  move(destination) {
    this.canCastle = false;
    super.move(destination);
  }

  computeMoves(pieces, needToVerify) {
    this.moves.erase();
    const x = this.coord.x;
    const y = this.coord.y;

    // Check every adjacent square
    const checkSquare = (coord) => {
      if (coord.isValid()) {
        let otherPiece = pieces.findByCoord(coord);
        if (otherPiece) {
          if (otherPiece.team !== this.team) {
            this.moves.add(this, coord, "X", otherPiece);
          }
        } else this.moves.add(this, coord, "M", null);
      }
    };

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!(i === 0 && j === 0)) checkSquare(new Coord(x + i, y + j));
      }
    }

    // Add valid castle moves
    // (not when looking for direct checks because a king can't capture the other king anyways)
    if (this.canCastle && needToVerify) {
      this.getCastleMoves(pieces);
    }

    if (needToVerify) super.verifyMoves(pieces);
  }

  getCastleMoves(pieces) {
    // find castle moves
    const checkCastle = (
      kingEndSquare,
      rookSquare,
      blockSquares,
      checkSquares,
      type
    ) => {
      let blocked = false;
      blockSquares.forEach((x) => {
        if (pieces.findByCoord(new Coord(x, this.coord.y))) blocked = true;
      });

      if (!blocked) {
        let check = false;
        const rook = pieces.findByCoord(new Coord(rookSquare, this.coord.y));
        if (rook)
          if (rook.type === "R" && rook.team === this.team && rook.canCastle) {
            pieces.pieces.forEach((p) => {
              if (p.team !== this.team) {
                checkSquares.forEach((x) => {
                  if (p.moves.find(new Coord(x, this.coord.y))) {
                    check = true;
                  }
                });
              }
            });
            if (!check) {
              this.moves.add(
                this,
                new Coord(kingEndSquare, this.coord.y),
                type,
                rook
              );
            }
          }
      }
    };

    checkCastle(2, 0, [1, 2, 3], [2, 3, 4], "OO"); // long castle
    checkCastle(6, 7, [5, 6], [4, 5, 6], "O"); // short castle
  }
}

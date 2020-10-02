import Piece from "./piece";
import Coord from "../helpers/coordinates";

export default class Pawn extends Piece {
  constructor(...args) {
    super(args);
    this.type = "P";
    this.enPassant = 0;
  }

  move(destination) {
    //en passant
    // if (this.team == "W") {
    //   if (this.coordinates.squareId - 16 == square) {
    //     this.enPassant = 2;
    //   } else this.enPassant = 0;
    // } else if (this.team == "B") {
    //   if (this.coordinates.squareId + 16 == square) {
    //     this.enPassant = 2;
    //   } else this.enPassant = 0;
    // }

    super.move(destination);
  }

  copy() {
    const newPiece = new Pawn(...super.getInfos());
    newPiece.enPassant = this.enPassant > 0 ? this.enPassant - 1 : 0;
    return newPiece;
  }

  computeMoves(pieces, needToVerify) {
    // this.moves.erase();
    // const x = this.coord.x;
    // const y = this.coord.y;
    // const checkMove = (coord) => {
    //   if (coord.isValid()) {
    //     let otherPiece = pieces.findByCoord(coord);
    //     if (otherPiece) {
    //       if (otherPiece.team !== this.team) {
    //         this.moves.add(this, coord, "X", otherPiece);
    //       }
    //     } else this.moves.add(this, coord, "M", null);
    //   }
    // };
    // checkMove(new Coord(x - 1, y - 2));
    // checkMove(new Coord(x - 2, y - 1));
    // checkMove(new Coord(x + 1, y - 2));
    // checkMove(new Coord(x + 2, y - 1));
    // checkMove(new Coord(x - 1, y + 2));
    // checkMove(new Coord(x - 2, y + 1));
    // checkMove(new Coord(x + 1, y + 2));
    // checkMove(new Coord(x + 2, y + 1));
    // if (needToVerify) super.verifyMoves(pieces);
  }
}

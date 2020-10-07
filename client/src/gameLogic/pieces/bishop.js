import Piece from "./piece";
import Coord from "../helpers/coordinates";

export default class Bishop extends Piece {
  constructor(...args) {
    super(args);
    this.type = "B";
  }

  copy() {
    return new Bishop(...super.getInfos());
  }

  computeMoves(pieces, needToVerify) {
    this.moves.erase();
    let flags = Array(4).fill(true);
    const x = this.coord.x;
    const y = this.coord.y;

    // Expand "vision" from the piece to the oustide in each direction
    const checkSquare = (flagNumber, coord) => {
      if (flags[flagNumber]) {
        if (!coord.isValid()) {
          flags[flagNumber] = false;
        } else {
          let otherPiece = pieces.findByCoord(coord);
          if (otherPiece) {
            if (otherPiece.team !== this.team) {
              this.moves.add(this, coord, "X", otherPiece);
            }
            flags[flagNumber] = false;
          } else this.moves.add(this, coord, "M", null);
        }
      }
    };

    for (let i = 1; i < 8; i++) {
      checkSquare(0, new Coord(x - i, y - i));
      checkSquare(1, new Coord(x + i, y - i));
      checkSquare(2, new Coord(x - i, y + i));
      checkSquare(3, new Coord(x + i, y + i));
    }

    if (needToVerify) super.verifyMoves(pieces);
  }
}

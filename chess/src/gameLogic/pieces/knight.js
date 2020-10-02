import Piece from "./piece";
import Coord from "../helpers/coordinates";

export default class Knight extends Piece {
  constructor(...args) {
    super(args);
    this.type = "N";
  }

  copy() {
    return new Knight(...super.getInfos());
  }

  computeMoves(pieces, needToVerify) {
    this.moves.erase();
    const x = this.coord.x;
    const y = this.coord.y;

    const checkMove = (coord) => {
      if (coord.isValid()) {
        let otherPiece = pieces.findByCoord(coord);
        if (otherPiece) {
          if (otherPiece.team !== this.team) {
            this.moves.add(this, coord, "X", otherPiece);
          }
        } else this.moves.add(this, coord, "M", null);
      }
    };

    checkMove(new Coord(x - 1, y - 2));
    checkMove(new Coord(x - 2, y - 1));
    checkMove(new Coord(x + 1, y - 2));
    checkMove(new Coord(x + 2, y - 1));
    checkMove(new Coord(x - 1, y + 2));
    checkMove(new Coord(x - 2, y + 1));
    checkMove(new Coord(x + 1, y + 2));
    checkMove(new Coord(x + 2, y + 1));

    if (needToVerify) super.verifyMoves(pieces);
  }
}

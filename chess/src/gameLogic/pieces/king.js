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

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!(i === 0 && j === 0)) checkMove(new Coord(x + i, y + j));
      }
    }

    if (this.canCastle) {
      this.getCastleMoves(pieces);
    }

    if (needToVerify) super.verifyMoves(pieces);
  }

  getCastleMoves(pieces) {}
}

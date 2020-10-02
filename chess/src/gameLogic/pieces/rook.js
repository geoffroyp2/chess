import Piece from "./piece";
import Coord from "../helpers/coordinates";

export default class Rook extends Piece {
  constructor(...args) {
    super(args);
    this.type = "R";
    this.canCastle = true;
  }

  copy() {
    const newPiece = new Rook(...super.getInfos());
    newPiece.canCastle = this.canCastle;
    return newPiece;
  }

  move(destination) {
    this.canCastle = false;
    super.move(destination);
  }

  computeMoves(pieces, needToVerify) {
    this.moves.erase();
    let flags = [...Array(4)].fill(true);
    const x = this.coord.x;
    const y = this.coord.y;

    const checkLine = (flagNumber, comparison, coord) => {
      if (flags[flagNumber]) {
        if (comparison()) {
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
      checkLine(0, () => x - i < 0, new Coord(x - i, y));
      checkLine(1, () => x + i > 7, new Coord(x + i, y));
      checkLine(2, () => y - i < 0, new Coord(x, y - i));
      checkLine(3, () => y + i > 7, new Coord(x, y + i));
    }

    if (needToVerify) super.verifyMoves(pieces);
  }
}

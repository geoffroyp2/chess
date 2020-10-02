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
    if (
      this.coord.y === destination.y - 2 ||
      this.coord.y === destination.y + 2
    )
      this.enPassant = 2;
    else this.enPassant = 0;

    super.move(destination);
  }

  copy() {
    const newPiece = new Pawn(...super.getInfos());
    // En passant status is handled as a decreasing count :
    // because pieces are copied each turn, the count decreased and is only equal to 1 when en-passant is possible
    newPiece.enPassant = this.enPassant > 0 ? this.enPassant - 1 : 0;
    return newPiece;
  }

  computeMoves(pieces, needToVerify) {
    this.moves.erase();
    const x = this.coord.x;
    const y = this.coord.y;
    const teamDirection = this.team === "W" ? -1 : +1;

    // ----------------- //
    // THIS IS A MESS ;) //
    // ----------------- //

    const checkStraight = (coord) => {
      if (pieces.findByCoord(coord)) return false;
      return true;
    };

    // 1 SQUARE FORWARD
    if (checkStraight(new Coord(x, y + teamDirection))) {
      //PROMOTION
      if ((this.team === "W" && y === 1) || (this.team === "B" && y === 6))
        this.moves.add(this, new Coord(x, y + teamDirection), "P", null);
      //NORMAL
      else {
        this.moves.add(this, new Coord(x, y + teamDirection), "M", null);
      }
    }

    // 2 SQUARE FORWARD
    if ((this.team === "W" && y === 6) || (this.team === "B" && y === 1)) {
      if (checkStraight(new Coord(x, y + 2 * teamDirection)))
        this.moves.add(this, new Coord(x, y + 2 * teamDirection), "M", null);
    }

    //CAPTURE LEFT
    const destinationLeft = new Coord(x - 1, y + teamDirection);
    if (destinationLeft.isValid()) {
      const otherPiece = pieces.findByCoord(destinationLeft);
      if (otherPiece) {
        if (otherPiece.team !== this.team) {
          //PROMOTION
          if ((this.team === "W" && y === 1) || (this.team === "B" && y === 6))
            this.moves.add(this, destinationLeft, "PX", otherPiece);
          //NORMAL
          else this.moves.add(this, destinationLeft, "X", otherPiece);
        }
      }

      //EN PASSANT
      if ((this.team === "W" && y === 3) || (this.team === "B" && y === 4)) {
        const otherPieceEP = pieces.findByCoord(new Coord(x - 1, y));
        if (otherPieceEP) {
          if (
            otherPieceEP.team !== this.team &&
            otherPieceEP.type === "P" &&
            otherPieceEP.enPassant > 0
          )
            this.moves.add(this, destinationLeft, "XEP", otherPieceEP);
        }
      }

      // CAPTURE RIGHT
      const destinationRight = new Coord(x + 1, y + teamDirection);

      if (destinationRight.isValid()) {
        const otherPiece = pieces.findByCoord(destinationRight);
        if (otherPiece) {
          if (otherPiece.team !== this.team) {
            //PROMOTION
            if (
              (this.team === "W" && y === 1) ||
              (this.team === "B" && y === 6)
            )
              this.moves.add(this, destinationRight, "PX", otherPiece);
            //NORMAL
            else this.moves.add(this, destinationRight, "X", otherPiece);
          }
        }

        //EN PASSANT
        if ((this.team === "W" && y === 3) || (this.team === "B" && y === 4)) {
          const otherPieceEP = pieces.findByCoord(new Coord(x + 1, y));
          if (otherPieceEP) {
            if (
              otherPieceEP.team !== this.team &&
              otherPieceEP.type === "P" &&
              otherPieceEP.enPassant > 0
            )
              this.moves.add(this, destinationRight, "XEP", otherPieceEP);
          }
        }
      }
    }

    if (needToVerify) super.verifyMoves(pieces);
  }
}

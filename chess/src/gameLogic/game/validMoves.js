import Coord from "../helpers/coordinates";

export default class ValidMoves {
  constructor() {
    this.moves = [];
  }

  add(piece, destination, type, otherPiece) {
    this.moves.push(new ValidMove(piece, destination, type, otherPiece));
  }

  find(x, y) {
    return this.moves.find((m) => m.destination.equals(new Coord(x, y)));
  }

  size() {
    return this.moves.length;
  }
  erase() {
    this.moves = [];
  }
}

class ValidMove {
  constructor(piece, destination, type, otherPiece) {
    this.piece = piece;
    this.type = type;
    this.destination = destination;
    this.otherPiece = otherPiece;
    // this.resultingState = null;
    // this.isCheck = false;
    // this.isCheckMate = false;
  }

  playMove() {
    //Update position of the pieces that need to move and return pieces that need to be removed

    switch (this.type) {
      case "M":
        this.piece.move(this.destination);
        break;
      case "X":
        this.piece.move(this.destination);
        return this.otherPiece;
      case "O":
        this.piece.move(this.destination); // need to be reworked to be more understandable
        this.otherPiece.castle(); //
        break;
      case "P":
        // Promotion is handled as a normal move then the peon is changed into another one by GameLogic
        this.piece.move(this.destination);
        break;
      case "PX":
        this.piece.move(this.destination);
        return this.otherPiece;
    }
    return null;
  }
}

import Coord from "../helpers/coordinates";

// ValidMoves is a simple container for ValidMove with access methods
export default class ValidMoves {
  constructor() {
    this.moves = [];
  }

  add(piece, destination, type, otherPiece) {
    this.moves.push(new ValidMove(piece, destination, type, otherPiece));
  }

  find(coord) {
    let move = null;
    this.moves.forEach((m) => {
      if (m.destination.equals(coord)) move = m;
    });
    return move;
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
  }

  copyMove(newPieces) {
    //returns a copy of the move with correct references in the new piece set
    const newMove = new ValidMove(null, this.destination, this.type, null);
    newPieces.pieces.forEach((p) => {
      if (p.id === this.piece.id) newMove.piece = p;
      if (this.otherPiece)
        if (p.id === this.otherPiece.id) newMove.otherPiece = p;
    });
    return newMove;
  }

  playMove() {
    //Update position of the pieces that need to move and return pieces that need to be removed
    this.piece.lastCoord = this.piece.coord;

    switch (this.type) {
      //SIMPLE MOVE
      case "M":
        this.piece.move(this.destination);
        break;
      //SIMPLE CAPTURE && EN-PASSANT (en-passant case is only used for highlights)
      case "X":
      case "XEP":
        this.piece.move(this.destination);
        return this.otherPiece;
      //SHORT CASTLE
      case "O":
        this.piece.move(this.destination);
        this.otherPiece.move(
          new Coord(this.destination.x - 1, this.destination.y)
        );
        break;
      //LONG CASTLE
      case "OO":
        this.piece.move(this.destination);
        this.otherPiece.move(
          new Coord(this.destination.x + 1, this.destination.y)
        );
        break;
      //PROMOTION
      case "P":
        // Promotion is handled as a normal move then the pawn is changed into another piece by GameState
        this.piece.move(this.destination);
        break;
      //PROMOTION + CAPTURE
      case "PX":
        this.piece.move(this.destination);
        return this.otherPiece;
      default:
        break;
    }
    return null;
  }
}

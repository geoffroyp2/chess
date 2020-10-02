import ValidMoves from "../game/validMoves";
// import Coord from "../helpers/coordinates";

export default class Piece {
  constructor([team, id, coord]) {
    this.team = team;
    this.coord = coord;
    this.id = id;
    this.lastCoord = null;

    this.moves = new ValidMoves();
  }

  getInfos() {
    //Used for deep copy of pieces, along with individual copy() methods
    return [this.team, this.id, this.coord];
  }

  move(destination) {
    //update piece coordinates
    this.coord = destination;
  }

  verifyMoves(pieces) {
    // for each previously found move (in each individual computeMoves() method), verify if it is legal (not self-check)
  }

  isAttacking(otherPiece) {
    // simple check for a move that can capture otherPiece
    this.moves.moves.forEach((m) => {
      if (m.destination.equals(otherPiece.coord)) return true;
    });
    return false;
  }

  getMoves() {
    return this.moves.moves;
  }
}

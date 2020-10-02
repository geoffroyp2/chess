import ValidMoves from "../game/validMoves";
// import Coord from "../helpers/coordinates";

export default class Piece {
  constructor([team, id, coord]) {
    this.team = team;
    this.coord = coord;
    this.id = id;

    this.lastCoord = null; // to highlight last move played

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
    const moves = this.moves.moves;

    //loop backwards to be able to work with splice
    for (let i = moves.length - 1; i >= 0; i--) {
      //create a copy of the state and simulate current move
      const pieceCopy = pieces.copy();
      const newMove = moves[i].copyMove(pieceCopy);

      const pieceToRemove = newMove.playMove();
      if (pieceToRemove) pieceCopy.remove(pieceToRemove);

      pieceCopy.computeOponentMoves(this.team);

      //if the move results in a check, remove it
      if (pieceCopy.isCheck) moves.splice(i, 1);
    }
  }

  getMoves() {
    return this.moves.moves;
  }
}

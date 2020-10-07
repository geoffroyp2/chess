import PieceSet from "../pieces/pieceSet";

export default class gameState {
  constructor(mode) {
    if (mode === "INIT") {
      this.pieces = new PieceSet("STANDARD");
      this.playerTurn = "W";
      this.computeMoves();
    } else if (mode === "EMPTY") {
      // USED FOR DEEP COPY
      this.pieces = null;
      this.playerTurn = null;
    }
  }

  computeMoves() {
    this.pieces.computeMoves(this.playerTurn);
  }

  getGameStatus() {
    return {
      checkmate: this.pieces.isCheckmate,
      stalemate: this.pieces.isStalemate,
      check: this.pieces.isCheck,
    };
  }

  promote(move, targetPiece) {
    //change the pawn into another piece (remove the pawn and add a new piece)
    const pawnToPromote = this.pieces.findById(move.piece.id);
    this.pieces.remove(pawnToPromote);
    this.pieces.promotePawn(pawnToPromote, targetPiece);
  }

  getNextState(move, promotionTarget) {
    //play move
    const pieceToRemove = move.playMove();
    if (pieceToRemove) this.pieces.remove(pieceToRemove);
    if (promotionTarget) this.promote(move, promotionTarget);

    // create next state (deep copy current one, change playerTurn and compute possible moves)
    const newState = new gameState("EMPTY");
    newState.pieces = this.pieces.copy();
    newState.playerTurn = this.playerTurn === "W" ? "B" : "W";
    newState.computeMoves();
    return newState;
  }
}

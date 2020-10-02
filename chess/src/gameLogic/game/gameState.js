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
    if (this.pieces.isCheckMate) return "CheckMate";
    if (this.pieces.isStaleMate) return "StaleMate";
    if (this.pieces.isCheck) return "Check";
    return null;
  }

  copy() {
    // Deep Copy
    const newState = new gameState("EMPTY");
    newState.pieces = this.pieces.copy();
    newState.playerTurn = this.playerTurn === "W" ? "B" : "W";
    newState.computeMoves();
    return newState;
  }

  getNextState(move) {
    //play move then deep copy the state
    const pieceToRemove = move.playMove();
    if (pieceToRemove) this.pieces.remove(pieceToRemove);
    return this.copy();
  }
}

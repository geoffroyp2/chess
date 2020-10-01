import PieceSet from "./pieceSet.js";

class GameLogic {
  constructor() {
    this.pieceSet = new PieceSet("DEFAULT");
  }

  click(x, y) {}
  getPieces() {
    return this.pieceSet.p;
  }
  getHighlights() {
    return [
      { type: "M", coord: { x: 3, y: 3 }, id: "M1" },
      { type: "X", coord: { x: 0, y: 1 }, id: "X1" },
    ];
  }
}

export default GameLogic;

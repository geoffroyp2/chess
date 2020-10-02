import GameState from "./game/gameState";
import Coord from "./helpers/coordinates";
import Highlight from "./helpers/highlight";

/*

------ TODO ------
- Use coord.isValid() for queen rook and bishop
- Only return piece changes ?

- EN PASSANT correct highlights
- CASTLE moves
- verify moves (remove illegal)
- promotion

*/

export default class GameLogic {
  constructor() {
    this.currentState = new GameState("INIT");
    this.gameHistory = [];

    this.pieceSelected = null;
    this.lastMove = null;

    this.gameHistory.push(this.currentState);
  }

  click(x, y) {
    // Process clicks
    // return new pieces and highlights

    const pieceClicked = this.currentState.pieces.findByCoord(new Coord(x, y));
    if (pieceClicked)
      if (pieceClicked.team === this.currentState.playerTurn)
        this.pieceSelected = pieceClicked;

    if (this.pieceSelected) {
      const moveSelected = this.pieceSelected.moves.find(x, y);
      if (moveSelected) {
        //TODO: handle promotion moves
        this.playMove(moveSelected);
      }
    }

    return [this.getPieces(), this.getHighlights()];
  }

  playMove(move) {
    this.currentState = this.currentState.getNextState(move);
    this.gameHistory.push(this.currentState);

    this.lastMove = move;
    this.pieceSelected = null;
  }

  getInitPieces() {
    return this.currentState.pieces.getFormattedPieces();
  }

  getPieces() {
    //TODO: only return changes
    return this.currentState.pieces.getFormattedPieces();
  }

  getHighlights() {
    let highlights = [];
    // If a piece is selected, highlight that piece and it's valid moves
    if (this.pieceSelected) {
      highlights.push(new Highlight("HS", this.pieceSelected.coord, "S"));
      this.pieceSelected.getMoves().forEach((m) => {
        if (m.type === "X") {
          highlights.push(
            new Highlight(
              "HX",
              m.destination,
              m.piece.id + m.destination.getString()
            )
          );
        } else if (m.type === "M") {
          highlights.push(
            new Highlight(
              "HM",
              m.destination,
              m.piece.id + m.destination.getString()
            )
          );
        }
      });
    }

    // Highlight last move played
    if (this.lastMove) {
      highlights.push(
        new Highlight("HLM", this.lastMove.piece.lastCoord, "HLM1")
      );
      highlights.push(new Highlight("HLM", this.lastMove.destination, "HLM2"));
    }

    return highlights;
  }
}

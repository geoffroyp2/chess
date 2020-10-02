import GameState from "./game/gameState";
import Coord from "./helpers/coordinates";
import Highlight from "./helpers/highlight";

/*

------ TODO ------
- Only return piece changes ?
- promotion
- game history
- PGN

- Ideas for better handling of each turn :
  -- instead of copying the state itself, generate a smaller "save file" of each position that can be parsed
  -- that method would need to keep in memory :
    --- the position of each piece
    --- the castling right for kings and rooks
    --- the en-passant status of each pawn

*/

export default class GameLogic {
  constructor() {
    this.currentState = new GameState("INIT");
    this.gameHistory = [];

    this.pieceSelected = null;
    this.lastMove = null;
    this.gameStatus = {};

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
      const moveSelected = this.pieceSelected.moves.find(new Coord(x, y));
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

    // TODO: handle game status
    this.gameStatus = this.currentState.getGameStatus();
    if (this.gameStatus.checkmate) console.log("checkmate");
    else if (this.gameStatus.stalemate) console.log("stalemate");
    else if (this.gameStatus.check) console.log("check");

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
        if (m.type === "X" || m.type === "PX") {
          highlights.push(
            new Highlight(
              "HX",
              m.destination,
              m.piece.id + m.destination.getString()
            )
          );
        } else if (
          m.type === "M" ||
          m.type === "P" ||
          m.type === "O" ||
          m.type === "OO" ||
          m.type === "XEP"
        ) {
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

    //Highlight check
    if (this.gameStatus.check) {
      highlights.push(
        new Highlight(
          "HC",
          this.currentState.pieces.findById(
            this.currentState.playerTurn + "K"
          ).coord,
          "HC"
        )
      );
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

import GameState from "./game/gameState";
import Coord from "./helpers/coordinates";
import Highlight from "./helpers/highlight";

/*

------ TODO ------
- Only return piece changes ?
- EN PASSANT correct highlights
- check, checkmate, stalemate, etc. => UI feedback
- promotion

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

    let gameStatus = this.currentState.getGameStatus();
    if (gameStatus) console.log(gameStatus);

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
        } else if (m.type === "M" || m.type === "O" || m.type === "OO") {
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

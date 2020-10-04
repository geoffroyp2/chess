import GameState from "./game/gameState";
import Coord from "./helpers/coordinates";
import Highlight from "./helpers/highlight";

/*

------ TODO ------

- Only return piece changes ?
- detect draws: 3-moves repetition, insufficient material, 50 moves rule
- game history
- PGN


- Ideas for better handling of each turn :
  -- instead of copying the state itself, generate a smaller "save file" of each position that can be parsed
  -- that method would need to keep in memory :
    --- the position of each piece
    --- the castling right for kings and rooks
    --- the en-passant status of each pawn
    --- the player turn
    --- other stats (50 moves rule)

*/

export default class GameLogic {
  constructor() {
    this.currentState = new GameState("INIT");
    this.gameHistory = [];

    this.pieceSelected = null;
    this.promotionMove = null;
    this.lastMove = null;
    this.gameStatus = {};

    this.gameHistory.push(this.currentState);
  }

  reset() {
    this.currentState = new GameState("INIT");
    this.gameHistory = [];
    this.pieceSelected = null;
    this.promotionMove = false;
    this.lastMove = null;
    this.gameStatus = {};
    this.gameHistory.push(this.currentState);
  }

  click({ x, y }) {
    // Process clicks, returns pieces, highlights and promotion area if necessary

    if (this.promotionMove) {
      this.handlePromotion(x, y);
    } else {
      const pieceClicked = this.currentState.pieces.findByCoord(
        new Coord(x, y)
      );
      if (this.pieceSelected) {
        if (pieceClicked === this.pieceSelected) this.pieceSelected = null;
        else {
          const moveSelected = this.pieceSelected.moves.find(new Coord(x, y));
          if (moveSelected) {
            if (moveSelected.type === "P" || moveSelected.type === "PX") {
              this.promotionMove = moveSelected;
            } else {
              this.playMove(moveSelected);
              this.pieceSelected = null;
            }
          } else if (pieceClicked) {
            if (pieceClicked.team === this.currentState.playerTurn)
              this.pieceSelected = pieceClicked;
            else this.pieceSelected = null;
          } else this.pieceSelected = null;
        }
      } else {
        if (pieceClicked)
          if (pieceClicked.team === this.currentState.playerTurn)
            this.pieceSelected = pieceClicked;
      }
    }
    return [this.getPieces(), this.getHighlights(), this.getPromotionArea()];
  }

  handlePromotion(x, y) {
    // detect which valid piece has been selected
    const targetX = this.promotionMove.destination.x;
    const targetY = this.promotionMove.destination.y;
    if (
      x === targetX &&
      y >= (targetY === 0 ? 0 : 4) &&
      y < (targetY === 0 ? 4 : 8)
    ) {
      let promotionTarget;
      if (y === 0 || y === 7) promotionTarget = "Q";
      else if (y === 1 || y === 6) promotionTarget = "R";
      else if (y === 2 || y === 5) promotionTarget = "N";
      else if (y === 3 || y === 4) promotionTarget = "B";
      this.playMove(this.promotionMove, promotionTarget);
    }

    this.promotionMove = null;
    this.pieceSelected = null;
  }

  playMove(move, promotionTarget) {
    this.currentState = this.currentState.getNextState(move, promotionTarget);
    this.gameHistory.push(this.currentState);

    // TODO: handle game status
    this.gameStatus = this.currentState.getGameStatus();
    if (this.gameStatus.checkmate) console.log("checkmate");
    else if (this.gameStatus.stalemate) console.log("stalemate");
    else if (this.gameStatus.check) console.log("check");

    this.lastMove = move;
  }

  getInitPieces() {
    return this.currentState.pieces.getFormattedPieces();
  }

  getPieces() {
    //TODO: only return changes ?
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

  getPromotionArea() {
    if (this.promotionMove) {
      return {
        coord: this.promotionMove.destination,
      };
    } else return null;
  }
}

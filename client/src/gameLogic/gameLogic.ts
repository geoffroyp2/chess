import { ClockTime, Coordinate, GameState, Move, MoveType, Piece, PieceType } from "../TSInterfaces/boardData";
import { BoardUI, HighlightUI, PromotionAreaInfos, HighlightType, PieceUI } from "../TSInterfaces/reactInterfaces";

import client from "./client/client";

import GameHistory from "./gameHistory";
import Timer from "./timer";

import generateInitialState from "./utils/stateGenerator";

/* TODO:

-- Test everything
-- Function RequestComputerMove()
  
*/

export class GameLogic {
  // ------------------------------
  //     Fields & Initialization
  // ------------------------------

  currentState: GameState;
  history: GameHistory;
  timer: Timer;

  pieceSelected: Piece | null;
  moveSelected: Move | null;
  promotionTarget: PieceType | null;
  promotionMode: boolean;
  lastMove: Move | null;

  UIRefresh: () => void; // callback to refresh the UI

  constructor() {
    this.currentState = generateInitialState("DEFAULT");
    this.pieceSelected = null;
    this.moveSelected = null;
    this.lastMove = null;
    this.promotionMode = false;
    this.promotionTarget = null;
    this.history = new GameHistory();
    this.timer = new Timer();

    this.UIRefresh = () => {};
  }

  plugUI(callback: () => void): void {
    this.UIRefresh = callback;
  }

  reset(): void {
    this.currentState = generateInitialState("DEFAULT");
    this.pieceSelected = null;
    this.moveSelected = null;
    this.lastMove = null;
    this.promotionMode = false;
    this.promotionTarget = null;
    this.history = new GameHistory();
    this.timer = new Timer();

    this.UIRefresh();
    this.newGame(300, 5, "DEFAULT");
  }

  // ------------------------------
  //      Handle Calls to API
  // ------------------------------

  newGame(totalTime: number, increment: number, mode?: string): void {
    const callback = (state: GameState) => {
      this.currentState = state;
      this.history.add(this.currentState);
      this.timer.synchronize(state.GameData.Time, state.BoardState.PlayerTurn);

      this.UIRefresh();
      console.log("New Game", this.currentState.GameData.GameId);
    };

    // time is converted to milliseconds
    client.newGame(mode || "DEFAULT", totalTime * 1000, increment * 1000, callback);
  }

  playMove(): void {
    const callback = (state: GameState) => {
      this.lastMove = this.moveSelected;
      this.moveSelected = null;

      this.currentState = state;
      this.history.add(this.currentState);

      this.timer.synchronize(state.GameData.Time, state.BoardState.PlayerTurn);

      this.handleGameStatus();
      this.UIRefresh();
    };

    if (this.moveSelected) client.sendMove(this.currentState, this.moveSelected, this.promotionTarget ? this.promotionTarget : 0, callback);
  }

  handleGameStatus(): void {
    /* TODO: visual feedback when game ends */

    if (this.currentState.BoardState.Checkmate) console.log("Checkmate");
    else if (this.currentState.BoardState.Stalemate) console.log("Stalemate");
    else if (this.currentState.BoardState.Check) console.log("Check");
  }

  // ------------------------------
  //    Handle User Interaction
  // ------------------------------

  click(coord: Coordinate, isMouseDown: boolean): void {
    //handle clicks coming from the UI isMouseDown differentiates end-of-drag mouse clicks from real ones

    if (this.promotionMode) {
      this.handlePromotion(coord);
      this.promotionMode = false;
      this.pieceSelected = null;
      this.promotionTarget = null;
    } else {
      const pieceClicked = this.currentState.BoardState.Pieces.find((p) => p.Coord.x === coord.x && p.Coord.y === coord.y);

      if (this.pieceSelected) {
        if (pieceClicked === this.pieceSelected && !isMouseDown) {
          // Needs testing
          this.pieceSelected = null;
        } else {
          this.moveSelected = this.pieceSelected.Moves.find((m) => m.To.x === coord.x && m.To.y === coord.y) || null;

          if (this.moveSelected) {
            this.moveSelected.From = this.pieceSelected.Coord;

            if (this.moveSelected.Type === MoveType.Promote || this.moveSelected.Type === MoveType.PromoteCapture) {
              this.promotionMode = true;
            } else {
              this.playMove();
              this.pieceSelected = null;
            }
          } else if (pieceClicked) {
            if (pieceClicked.Team === this.currentState.BoardState.PlayerTurn && isMouseDown) {
              this.pieceSelected = pieceClicked;
            } else {
              this.pieceSelected = null;
            }
          } else {
            this.pieceSelected = null;
          }
        }
      } else {
        if (pieceClicked && pieceClicked.Team === this.currentState.BoardState.PlayerTurn) {
          this.pieceSelected = pieceClicked;
        }
      }
    }

    // Refresh after each click even if nothing changed to deal with highlights and other changing elements
    this.UIRefresh();
  }

  handlePromotion(coord: Coordinate): void {
    if (this.moveSelected && this.pieceSelected) {
      if (
        coord.x === this.moveSelected.To.x &&
        coord.y >= (this.pieceSelected.Team ? 0 : 4) &&
        coord.y < (this.pieceSelected.Team ? 4 : 8)
      ) {
        if (coord.y === 0 || coord.y === 7) this.promotionTarget = PieceType.Queen;
        else if (coord.y === 1 || coord.y === 6) this.promotionTarget = PieceType.Rook;
        else if (coord.y === 2 || coord.y === 5) this.promotionTarget = PieceType.Knight;
        else if (coord.y === 3 || coord.y === 4) this.promotionTarget = PieceType.Bishop;

        this.playMove();
      }
    }
  }

  // ------------------------------
  // Data access methods for the UI
  // ------------------------------

  getTime(): ClockTime {
    // called from the UI

    return this.timer.getTime();
  }

  getGameInfos(): BoardUI {
    return {
      PlayerTurn: this.currentState.BoardState.PlayerTurn,
      Pieces: this.getPieces(),
      Highlights: this.getHighlights(),
      PromotionArea: this.getPromotionArea(),
    };
  }

  getPieces(): PieceUI[] {
    let pieces: PieceUI[] = [];
    this.currentState.BoardState.Pieces.forEach((p) => {
      pieces.push({
        Team: p.Team,
        Coord: { x: p.Coord.x, y: p.Coord.y },
        Type: p.Type,
      });
    });
    return pieces;
  }

  getHighlights(): HighlightUI[] {
    let highlights: HighlightUI[] = [];

    // If a piece is selected, highlight that piece and it's valid moves
    if (this.pieceSelected) {
      highlights.push({
        Type: HighlightType.Select,
        Coord: this.pieceSelected.Coord,
      });
      this.pieceSelected.Moves.forEach((m) => {
        // Capture overlay
        if (m.Type === MoveType.Capture || m.Type === MoveType.PromoteCapture)
          highlights.push({
            Type: HighlightType.Capture,
            Coord: m.To,
          });
        // Move Overlay
        else
          highlights.push({
            Type: HighlightType.Move,
            Coord: m.To,
          });
      });
    }

    //Highlight check
    if (this.currentState.BoardState.Check) {
      const king = this.currentState.BoardState.Pieces.find(
        (p) => p.Team === this.currentState.BoardState.PlayerTurn && p.Type === PieceType.King
      );
      if (king) {
        highlights.push({
          Type: HighlightType.Check,
          Coord: king.Coord,
        });
      }
    }

    // Highlight last move played
    if (this.lastMove && this.lastMove.From) {
      highlights.push({
        Type: HighlightType.LastMove,
        Coord: this.lastMove.From,
      });
      highlights.push({
        Type: HighlightType.LastMove,
        Coord: this.lastMove.To,
      });
    }

    return highlights;
  }

  getPromotionArea(): PromotionAreaInfos | null {
    if (this.promotionMode && this.moveSelected && this.pieceSelected)
      return { Coord: this.moveSelected.To, Team: this.pieceSelected.Team };
    return null;
  }
}

const game = new GameLogic();
export default game;

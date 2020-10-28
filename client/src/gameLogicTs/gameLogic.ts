import { ClockTime, GameState, Move, MoveType, Piece, PieceType } from "../interfaces/boardData";
import { BoardUI, Highlight, PromotionArea, HighlightType } from "../interfaces/reactInterfaces";

import client from "./client/client";

import GameHistory from "./gameHistory";
import Timer from "./timer";

import generateInitialState from "./utils/stateGenerator";


class GameLogic {

    // ------------------------------
    //     Fields & Initialization
    // ------------------------------

    currentState: GameState;
    pieceSelected: Piece | null;
    moveSelected: Move | null;
    promotionTarget: string | null;
    lastMove: Move | null;
    history: GameHistory;
    timer: Timer;

    UIRefresh: () => void;

    constructor() {
        this.reset();
    }

    plugUi(callback: () => void): void {
        this.UIRefresh = callback;
    }

    reset(): void {
        this.currentState = generateInitialState();
        this.pieceSelected = null;
        this.moveSelected = null;
        this.lastMove = null;
        this.promotionTarget = null;
        this.history = new GameHistory();
        this.timer = new Timer();
    }

    // ------------------------------
    //      Handle Calls to API
    // ------------------------------

    newGame(totalTime: number, increment: number, mode?: string): void {

        const callback = (state: GameState) => {
            this.currentState = state;
            this.history.add(this.currentState);

            this.timer.synchronize(state.GameData.Time, state.BoardState.PlayerTurn);

            console.log("New Game");
            this.UIRefresh();
        }

        client.newGame(mode || "DEFAULT", totalTime, increment, callback);
    }

    playMove(): void {
        const callback = (state: GameState) => {

            this.lastMove = this.moveSelected;
            this.moveSelected = null;
            this.promotionTarget = null;

            this.currentState = state;
            this.history.add(this.currentState);

            this.timer.synchronize(state.GameData.Time, state.BoardState.PlayerTurn);

            this.handleGameStatus();
            this.UIRefresh();
        }

        client.sendMove(this.currentState, this.moveSelected, this.promotionTarget, callback);
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

    click(x: number, y: number, isMouseDown: boolean): void {

        /* TODO */

    }

    handlePromotion(x: number, y: number): void {

        /* TODO */

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
            Pieces: this.currentState.BoardState.Pieces,
            Highlights: this.getHighlights(),
            PromotionArea: this.getPromotionArea()
        }
    }

    getHighlights(): Highlight[] {
        let highlights: Highlight[] = [];

        // If a piece is selected, highlight that piece and it's valid moves
        if (this.pieceSelected) {
            highlights.push({
                Type: HighlightType.Select,
                Coord: this.pieceSelected.Coord
            });
            this.pieceSelected.Moves.forEach((m) => {
                // Capture overlay
                if (m.Type === MoveType.Capture || m.Type === MoveType.PromoteCapture)
                    highlights.push({
                        Type: HighlightType.Capture,
                        Coord: m.To
                    });
                // Move Overlay
                else
                    highlights.push({
                        Type: HighlightType.Move,
                        Coord: m.To
                    });
            });
        }

        //Highlight check
        if (this.currentState.BoardState.Check) {
            highlights.push({
                Type: HighlightType.Check,
                Coord: this.currentState.BoardState.Pieces.find((p) => {
                    p.Team === this.currentState.BoardState.PlayerTurn &&
                        p.Type === PieceType.King
                }).Coord
            });
        }

        // Highlight last move played
        if (this.lastMove) {
            highlights.push({
                Type: HighlightType.LastMove,
                Coord: this.lastMove.From
            })
            highlights.push({
                Type: HighlightType.LastMove,
                Coord: this.lastMove.To
            })
        }

        return highlights;
    }

    getPromotionArea(): PromotionArea | null {
        if (this.promotionTarget)
            return { Coord: this.moveSelected.To }
        else return null;
    }
}


const game = new GameLogic();
export default game;
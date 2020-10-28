import { BoardState, Move, GameState, PieceType } from "./boardData";

export interface NGRequest {
  ReqType: string;
  GameMode: string;
  Time: number;
  Increment: number;
}

export interface MRequest {
  ReqType: string;
  GameId: number;
  Data: BoardData;
}

export interface BoardData {
  Board: BoardState;
  FEN: string;
  Move: Move;
  Prom: PieceType | null;
}

export interface Response {
  ResId: number;
  GameState: GameState;
}

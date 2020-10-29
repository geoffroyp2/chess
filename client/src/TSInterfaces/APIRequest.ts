import { BoardState, Move, GameState, PieceType } from "./boardData";

// interfaces used to communicate with the API

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

export interface APIResponse {
  ResId: number;
  GameState: GameState;
}

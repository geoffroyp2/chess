// TypeScript interfaces that define all the data structures used by the app

export interface GameState {
  GameData: GameData;
  BoardState: BoardState;
}

export interface GameData {
  GameId: number;
  MoveClock: number;
  TotalMoves: number;
  Time: ClockTime;
}

export interface ClockTime {
  white: number;
  black: number;
}

export interface BoardState {
  PlayerTurn: boolean;
  Check: boolean;
  Checkmate: boolean;
  Stalemate: boolean;
  Pieces: Piece[];
}

export enum PieceType {
  King = 1,
  Queen,
  Rook,
  Knight,
  Bishop,
  Pawn,
}

export interface Piece {
  Type: PieceType;
  Team: boolean;
  EP: boolean;
  Castle: boolean;
  Coord: Coordinate;
  Moves: Move[];
}

export enum MoveType {
  Normal,
  Pawntwo,
  Capture,
  EnPassant,
  Promote,
  PromoteCapture,
  LongCastle,
  ShortCastle,
}

export interface Move {
  Type: MoveType;
  To: Coordinate;
  From?: Coordinate;
}

export interface Coordinate {
  x: number;
  y: number;
}

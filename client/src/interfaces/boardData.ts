export interface GameState {
    GameData: GameData,
    BoardState: BoardState
}

export interface GameData {
    GameId: number,
    MoveClock: number,
    TotalMoves: number,
    Time: ClockTime
}

export interface ClockTime {
    white: number,
    black: number
}

export interface BoardState {
    PlayerTurn: boolean,
    Check: boolean,
    Checkmate: boolean,
    Stalemate: boolean,
    Pieces: Piece[]
}

export enum PieceType {
    King,
    Queen,
    Rook,
    Knight,
    Bishop,
    Pawn
}

export interface Piece {
    Type: PieceType,
    Team: boolean,
    EP: boolean,
    Castle: boolean,
    Coord: Coordinate,
    Moves: Move[]
}

export enum MoveType {
    Capture,
    EnPassant,
    LongCastle,
    ShortCastle,
    Normal,
    Promote,
    PromoteCapture,
    PawnTwo
}

export interface Move {
    Type: MoveType
    To: Coordinate,
    From: Coordinate,
}

export interface Coordinate {
    x: number,
    y: number
}
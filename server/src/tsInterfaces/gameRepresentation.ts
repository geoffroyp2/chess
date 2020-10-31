import { BoardState, ClockTime } from "../../../client/src/TSInterfaces/boardData";

export interface GameRecord {
  ID: number;
  Infos: {
    StartTime: Date;
    GameMode: string;
    TimeControl: {
      time: number;
      increment: number;
    };
    Players: {
      white: string;
      black: string;
    };
    Pgn: string;
  };
  BoardStates: BoardState[];
  LastMoveDate: Date;
  ClockTime: ClockTime;
  FEN: string[];
}

import { BoardState, ClockTime } from "../../../client/src/TSInterfaces/boardData";

export interface GameRecord {
  ID: number;
  Infos: {
    StartTime: Date;
    GameMode: string;
    TimeControl: string;
    Players: {
      white: string;
      black: string;
    };
    Pgn: string;
  };
  BoardStates?: BoardState[];
  LastMove?: Date;
  ClockTime?: ClockTime;
}

import { GameState } from "../../TSInterfaces/boardData";
import generatePosition from "./positionGenerator";

export default function generateInitialState(mode: string): GameState {
  return {
    GameData: {
      GameId: -1,
      MoveClock: 0,
      TotalMoves: 0,
      Time: { white: 300000, black: 300000 },
    },
    BoardState: generatePosition(mode),
  };
}

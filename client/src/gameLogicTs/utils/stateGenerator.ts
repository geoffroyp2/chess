import { GameState } from "../../interfaces/boardData";
import generatePosition from "./positionGenerator";

export default function generateInitialState(): GameState {

    return {
        GameData: {
            GameId: -1,
            MoveClock: 0,
            TotalMoves: 0,
            Time: { white: 300000, black: 300000 }
        },
        BoardState: generatePosition("DEFAULT")
    }
}
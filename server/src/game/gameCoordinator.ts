import { NGRequest, MRequest, APIResponse } from "../../../client/src/TSInterfaces/APIRequest";
import { BoardState } from "../../../client/src/TSInterfaces/boardData";
import gameSessions from "./gameSessions";
import gameManager from "./gameManager";
import engineCom from "./engineCom";

class GameCoordinator {
  public newGame(data: NGRequest, callback: (res: APIResponse) => void) {
    // TODO
    console.log("New game", data);

    // initialize game session
    let g = gameManager.newGame(data.GameMode, data.Time, data.Increment);
    gameSessions.addGame(g);

    const onReceive = (res: any) => {
      const board: BoardState = res.data;

      let response: APIResponse = {
        ResId: 1,
        GameState: {
          BoardState: board,
          GameData: {
            GameId: g.ID,
            MoveClock: 0,
            TotalMoves: 0,
            Time: g.ClockTime,
          },
        },
      };

      callback(response);
    };

    // query the engine to calculate the board position
    engineCom.sendPosition(g.BoardStates[0], { Type: 0, From: { x: -1, y: -1 }, To: { x: -1, y: -1 } }, 0, onReceive);
  }

  public sendMove(data: MRequest, callback: (res: APIResponse) => void) {
    //TODO
    console.log("New move", data.Data.Move, data.Data.Prom);

    let res: APIResponse = {
      ResId: 1,
      GameState: {
        BoardState: data.Data.Board,
        GameData: {
          GameId: 1,
          MoveClock: 0,
          TotalMoves: 0,
          Time: { white: 1000, black: 1000 },
        },
      },
    };
  }
}

const gameCoordinator = new GameCoordinator();
export default gameCoordinator;

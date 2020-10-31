import { NGRequest, MRequest, APIResponse } from "../../../client/src/TSInterfaces/APIRequest";
import { BoardState } from "../../../client/src/TSInterfaces/boardData";
import gameSessions from "./gameSessions";
import gameManager from "./gameManager";
import engineCom from "./engineCom";
import { GameRecord } from "../tsInterfaces/gameRepresentation";

class GameCoordinator {
  public newGame(data: NGRequest, callback: (res: APIResponse) => void): void {
    // TODO
    console.log("New game", data);

    // callback for the engine
    const onReceive = (res: any): void => {
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

    // initialize game session
    let g = gameManager.newGame(data.GameMode, data.Time, data.Increment);
    gameSessions.addGame(g);

    // query the engine to calculate the new board position
    engineCom.sendPosition(g.BoardStates[0], { Type: -1, From: { x: -1, y: -1 }, To: { x: -1, y: -1 } }, 0, onReceive);
  }

  public sendMove(data: MRequest, callback: (res: APIResponse) => void): void {
    //TODO

    const { Board, Move, Prom, FEN } = data.Data;
    console.log("New move", Move, Prom);

    const onReceive = (res: any): void => {
      const newBoard: BoardState = res.data;
      const gameRecord: GameRecord = gameSessions.find(data.GameId);

      gameManager.updateGame(gameRecord, newBoard, Move, Prom);
      gameSessions.updateGame(gameRecord);

      let response: APIResponse = {
        ResId: 1,
        GameState: {
          BoardState: newBoard,
          GameData: {
            GameId: gameRecord.ID,
            MoveClock: 0,
            TotalMoves: 0,
            Time: gameRecord.ClockTime,
          },
        },
      };
      callback(response);
    };

    // query the engine to calculate the new board position
    engineCom.sendPosition(Board, Move, Prom, onReceive);
  }
}

const gameCoordinator = new GameCoordinator();
export default gameCoordinator;

import { NGRequest, MRequest, APIResponse } from "../../../client/src/TSInterfaces/APIRequest";
import generatePosition from "../../../client/src/gameLogic/utils/positionGenerator";

class GameCoordinator {
  post(data: NGRequest | MRequest) {
    console.log(data);

    return { coucou: "coucoucou" };
  }

  newGame(data: NGRequest): APIResponse {
    // TODO
    console.log("New game", data);

    let res: APIResponse = {
      ResId: 1,
      GameState: {
        BoardState: generatePosition(data.GameMode),
        GameData: {
          GameId: 1,
          MoveClock: 0,
          TotalMoves: 0,
          Time: { white: data.Time, black: data.Time },
        },
      },
    };

    return res;
  }

  sendMove(data: MRequest): APIResponse {
    //TODO
    console.log("New move", data);

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
    return res;
  }
}

const gameCoordinator = new GameCoordinator();
export default gameCoordinator;

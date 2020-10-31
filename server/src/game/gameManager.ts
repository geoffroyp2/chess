import { GameRecord } from "../tsInterfaces/gameRepresentation";
import generatePosition from "../../../client/src/gameLogic/utils/positionGenerator";

class GameManager {
  newGame(gameMode: string, time: number, inc: number): GameRecord {
    const gameID = this.getNewId();
    const now = new Date();
    const initBoard = generatePosition(gameMode);

    let rec = {
      ID: gameID,
      Infos: {
        StartTime: now,
        GameMode: gameMode,
        TimeControl: `${Math.floor(time / 1000)}+${Math.floor(inc / 1000)}`,
        Players: {
          white: "PHW", // TODO: change from placeHolder
          black: "PHB", // to the actual player IDs
        },
        Pgn: "", // TODO: create initial PGN + for each new move
      },
      BoardStates: [],
      LastMove: now,
      ClockTime: { white: time, black: time },
    };

    rec.BoardStates.push(initBoard);
    return rec;
  }

  getNewId(): number {
    // todo : query the database to find a vali id;
    return Math.floor(Math.random() * 100000);
  }
}

const gameManager = new GameManager();
export default gameManager;

import { GameRecord } from "../tsInterfaces/gameRepresentation";

class GameManager {
  newGame(gameMode: string, time: number, inc: number): GameRecord {
    const gameID = this.getNewId();

    return {
      ID: gameID,
      Infos: {
        StartTime: new Date(),
        GameMode: gameMode,
        TimeControl: `${Math.floor(time / 1000)}+${Math.floor(inc / 1000)}`,
        Players: {
          white: "PHW", // TODO: change from placeHolder
          black: "PHB", // to the actual player IDs
        },
      },
      Pgn: "", // TODO: create initial PGN
    };
  }

  getNewId(): number {
    // todo : query the database to find a vali id;
    return Math.floor(Math.random() * 100000);
  }
}

const gameManager = new GameManager();
export default gameManager;

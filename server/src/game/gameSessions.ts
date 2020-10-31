import { GameRecord } from "../tsInterfaces/gameRepresentation";

class GameSessions {
  // Storage / access for live games

  liveGames: { [id: number]: GameRecord };

  constructor() {
    this.liveGames = {};
  }

  find(id: number): GameRecord {
    return this.liveGames[id];
  }

  addGame(game: GameRecord): void {
    this.liveGames[game.ID] = game;

    // TODO: update the database
  }

  updateGame(gameRecord: GameRecord): void {
    this.liveGames[gameRecord.ID] = gameRecord;
    // TODO: update the database
  }

  finishGame(game: GameRecord): void {
    delete this.liveGames[game.ID];
    delete this.liveGames[game.ID];
  }
}

const gameSessions = new GameSessions();
export default gameSessions;

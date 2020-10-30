import { GameRecord } from "../tsInterfaces/gameRepresentation";

class GameSessions {
  // Storage / access for live games

  liveGames: { [id: number]: GameRecord };

  constructor() {
    this.liveGames = {};
  }

  addGame(game: GameRecord): void {
    this.liveGames[game.ID] = game;

    // TODO: update the database
  }

  updateGame(id: number, newMove: string): void {
    this.liveGames[id].Pgn += newMove;

    // TODO: update the database
  }

  finishGame(game: GameRecord): void {
    delete this.liveGames[game.ID];
  }
}

const gameSessions = new GameSessions();
export default gameSessions;

import { GameRecord } from "../tsInterfaces/gameRepresentation";
import generatePosition from "../../../client/src/gameLogic/utils/positionGenerator";
import { BoardState, Move, PieceType } from "../../../client/src/TSInterfaces/boardData";

class GameManager {
  newGame(gameMode: string, time: number, inc: number): GameRecord {
    const gameID = this.getNewId();
    const initBoard = generatePosition(gameMode);
    const now = new Date();

    let rec = {
      ID: gameID,
      Infos: {
        StartTime: now,
        GameMode: gameMode,
        TimeControl: {
          time: time,
          increment: inc,
        },
        Players: {
          white: "PHW", // TODO: change from placeHolder
          black: "PHB", // to the actual player IDs
        },
        Pgn: "", // TODO: create initial PGN + for each new move
      },
      BoardStates: [],
      LastMoveDate: now,
      ClockTime: { white: time, black: time },
      FEN: [],
    };

    rec.BoardStates.push(initBoard);
    return rec;
  }

  updateGame(game: GameRecord, newBoard: BoardState, move: Move, Prom?: PieceType): void {
    game.BoardStates.push(newBoard);

    // -> append new move to PGN
    //TODO

    // -> generate FEN and add to array
    // TODO

    // -> update clock time
    // TODO : check for lost on time before applying increment
    const now = new Date();
    const ellapsed = now.getTime() - game.LastMoveDate.getTime();

    if (newBoard.PlayerTurn) game.ClockTime.white -= ellapsed + game.Infos.TimeControl.increment;
    else game.ClockTime.black -= ellapsed + game.Infos.TimeControl.increment;

    game.LastMoveDate = now;

    // -> deal with end of game (stalemate, checkmate, timeout, other...)
    // TODO
  }

  getNewId(): number {
    // todo : query the database to find a vali id;
    return Math.floor(Math.random() * 100000);
  }
}

const gameManager = new GameManager();
export default gameManager;

// class wrapper for the client with simpler methods that are called from gameLogic

import Client from "./client";
import initData from "../gameLogic/utils/initData.json";

export default class ClientHandler {
  requestNewGame({ mode, totalTime, increment }, callback) {
    const onReceive = ({ id, args }) => {
      console.log(args.board);
      callback(args);
    };

    let fen, board;
    switch (mode) {
      case "D":
      default:
        fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        board = initData;
        break;
    }

    Client.sendRequest(
      JSON.stringify({
        id: "NG",
        args: {
          mode: mode,
          time: totalTime,
          inc: increment,
          fen: fen,
          board: board,
        },
      }),
      onReceive
    );
  }

  playMove({ move, promotion, fen, board }, callback) {
    const onReceive = ({ id, args }) => {
      // console.log("API answer status", id, "\nargs:", args);
      console.log(args.board);
      callback(args);
    };

    Client.sendRequest(
      JSON.stringify({
        id: "M",
        args: {
          move: move,
          prom: promotion || null,
          fen: fen,
          board: board,
        },
      }),
      onReceive
    );
  }
}

// class wrapper for the client with simpler methods that are called from gameLogic

import Client from "./client";

export default class ClientHandler {
  newGame({ mode, totalTime, increment, FEN }, callback) {
    const receiveAnswer = ({ id, args, ai }) => {
      console.log("API answer status", id, "\nargs:", args, "\nai: ", ai);
      callback(id, args.gameId, args.time);
    };

    Client.sendRequest(
      JSON.stringify({
        id: "ng",
        args: {
          mode: mode,
          time: totalTime,
          inc: increment,
          fen: FEN,
        },
      }),
      receiveAnswer
    );
  }

  requestNewGame({ mode, totalTime, increment }, callback) {
    const onReceive = ({ id, args }) => {
      console.log("API answer status", id, "\nargs:", args);
      callback(args);
    };

    let FEN;
    switch (mode) {
      case "D":
      default:
        FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        break;
    }

    Client.sendRequest(
      JSON.stringify({
        id: "NG",
        args: {
          mode: mode,
          time: totalTime,
          inc: increment,
          fen: FEN,
        },
      }),
      onReceive
    );
  }

  sendMove({ move, promotion, FEN }, callback) {
    const receiveAnswer = ({ id, args, ai }) => {
      console.log("API answer status", id, "\nargs:", args, "\nai: ", ai);
      callback(id, args.gameId, args.time);
    };

    Client.sendRequest(
      JSON.stringify({
        id: "m",
        args: {
          from: move.piece.coord.getString(),
          to: move.destination.getString(),
          more: promotion,
          fen: FEN,
        },
      }),
      receiveAnswer
    );
  }

  playMove({ move, promotion, FEN }, callback) {
    const onReceive = ({ id, args }) => {
      // console.log("API answer status", id, "\nargs:", args);
      console.log(args.board);
      callback(args);
    };

    Client.sendRequest(
      JSON.stringify({
        id: "M",
        args: {
          from: move.from,
          to: move.to,
          prom: promotion || null,
          fen: FEN,
        },
      }),
      onReceive
    );
  }
}

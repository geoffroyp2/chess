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
}

// class wrapper for the client with simpler methods that are called from gameLogic

import Client from "./client";

export default class ClientHandler {
  newGame({ mode, totalTime, increment }, callback) {
    const receiveAnswer = ({ id, args }) => {
      console.log("API answer status", id, "\nargs:", args);
      callback(id, args.gameId, args.time);
    };

    Client.sendRequest(
      JSON.stringify({
        id: "ng",
        args: {
          mode: mode,
          time: totalTime,
          inc: increment,
        },
      }),
      receiveAnswer
    );
  }

  sendMove({ move, promotion }, callback) {
    const receiveAnswer = ({ id, args }) => {
      console.log("API answer status", id, "\nargs:", args);
      callback(id, args.gameId, args.time);
    };

    Client.sendRequest(
      JSON.stringify({
        id: "m",
        args: {
          from: move.piece.coord.getString(),
          to: move.destination.getString(),
          more: promotion,
        },
      }),
      receiveAnswer
    );
  }
}

const answer = require("./answer");
const GameInstance = require("./gameInstance.js");

class GameHandler {
  constructor() {
    this.GameInstance = null;
  }

  request(req) {
    const { id, args } = JSON.parse(req);
    let res;
    switch (id) {
      case "m":
        res = this.handleMove(args);
        break;
      case "ng":
        res = this.newGame(args);
        break;
      default:
        res = new answer(false, {});
        break;
    }

    return res;
  }

  handleMove(argsI) {
    console.log("new move: ", argsI.from, argsI.to, argsI.fen);

    const argsO = {
      gameId: this.GameInstance.id,
      time: this.GameInstance.nextMove(argsI.from, argsI.to),
    };
    return new answer(true, argsO);
  }

  newGame(argsI) {
    console.log("new game: ", argsI.mode, argsI.time, argsI.inc, argsI.fen);

    this.GameInstance = new GameInstance(
      this.getNewId(),
      argsI.mode,
      argsI.time,
      argsI.inc
    );

    const argsO = {
      gameId: this.GameInstance.id,
      time: this.GameInstance.time,
    };
    return new answer(true, argsO);
  }

  getNewId() {
    // TODO: find existing ids in db and return a new unused one

    return Math.floor(Math.random() * 10000);
  }
}

module.exports = new GameHandler();

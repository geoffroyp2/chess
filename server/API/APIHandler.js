const answer = require("./answer");

class GameHandler {
  constructor() {
    this.id = Math.floor(Math.random() * 10000);
    this.time = 300 * 1000;
  }

  request(req) {
    const { id, args } = JSON.parse(req);
    let answer;
    switch (id) {
      case "m":
        answer = this.handleMove(args);
        break;
      case "ng":
        answer = this.newGame(args);
      default:
        answer = new answer(false, {});
        break;
    }

    return answer;
  }

  handleMove(argsI) {
    console.log("new move: ", argsI.from, argsI.to);

    this.time--;
    const argsO = {
      gameId: this.id,
      time: this.time,
    };
    return new answer(true, argsO);
  }

  newGame(argsI) {
    console.log("new game: ", argsI.from, argsI.to);

    const argsO = {
      gameId: this.id,
      time: this.time,
    };
    return new answer(true, argsO);
  }
}

module.exports = new GameHandler();

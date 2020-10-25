const answer = require("./answer");
const GameInstance = require("./gameInstance.js");

const iaHandler = require("../ia/IAHandler");

class GameHandler {
  constructor() {
    this.GameInstance = null;
  }

  request = async (req) => {
    const { id, args } = JSON.parse(req);

    //New Game
    if (id === "NG") {
      console.log("new game: ", args.mode, args.time, args.inc, args.fen);
      const r = await (async () => {
        return iaHandler.getNewBoard(args.board);
      })()
        .then((newBoard) => {
          // console.log(newBoard);
          this.GameInstance = new GameInstance(
            this.getNewId(),
            args.mode,
            args.time,
            args.inc,
            args.fen
            // args.board
          );

          const argsO = {
            gameId: this.GameInstance.id,
            time: this.GameInstance.nextMove(null, null, args.fen),
            board: newBoard,
          };
          return new answer(true, argsO);
        })
        .catch((e) => console.error(e));
      return Promise.resolve(r);
    }

    // Send move
    else if (id === "M") {
      console.log("Move sent: ", args.move.From, args.move.To, args.fen);

      const r = await (async () => {
        return iaHandler.sendMove(args.move, args.prom, args.board);
      })()
        .then((newBoard) => {
          const argsO = {
            gameId: this.GameInstance.id,
            time: this.GameInstance.nextMove(args.from, args.to),
            board: newBoard,
          };
          return new answer(true, argsO);
        })
        .catch((e) => console.error(e));
      return Promise.resolve(r);
    }
  };

  getNewId() {
    // TODO: find existing ids in db and return a new unused one

    return Math.floor(Math.random() * 10000);
  }
}

module.exports = new GameHandler();

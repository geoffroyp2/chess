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
        return iaHandler.getNewBoard(args.fen);
      })()
        .then((newBoard) => {
          // console.log(newBoard);
          this.GameInstance = new GameInstance(
            this.getNewId(),
            args.mode,
            args.time,
            args.inc,
            args.fen
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
      console.log("Move sent: ", args.from, args.to, "//", args.fen);

      const r = await (async () => {
        return iaHandler.sendMove(args.from, args.to, args.prom, args.fen);
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

  // newGame = async (argsI) => {
  //   console.log("new game: ", argsI.mode, argsI.time, argsI.inc, argsI.fen);
  //   (async () => {
  //     return iaHandler.getNewBoard(argsI.fen);
  //   })()
  //     .then((newBoard) => {
  //       // console.log(newBoard);
  //       this.GameInstance = new GameInstance(
  //         this.getNewId(),
  //         argsI.mode,
  //         argsI.time,
  //         argsI.inc,
  //         argsI.fen
  //       );

  //       const argsO = {
  //         gameId: this.GameInstance.id,
  //         time: this.GameInstance.nextMove(null, null, argsI.fen),
  //         board: newBoard,
  //       };
  //       return Promise.resolve(new answer(true, argsO));
  //     })
  //     .catch((e) => console.error(e));
  // };

  // sendMove(argsI) {
  //   console.log("Move sent: ", argsI.from, argsI.to, "//", argsI.fen);

  //   (async () => {
  //     return new Promise(
  //       await iaHandler.sendMove(argsI.from, argsI.to, argsI.prom, argsI.fen)
  //     );
  //   })()
  //     .then((newBoard) => {
  //       const argsO = {
  //         gameId: this.GameInstance.id,
  //         time: this.GameInstance.nextMove(argsI.from, argsI.to),
  //         board: newBoard,
  //       };
  //       return new answer(true, argsO);
  //     })
  //     .catch((e) => console.error(e));
  // }

  move(argsI) {
    console.log("new move: ", argsI.from, argsI.to, argsI.fen);

    const argsO = {
      gameId: this.GameInstance.id,
      time: this.GameInstance.nextMove(argsI.from, argsI.to),
    };
    return new answer(true, argsO);
  }

  ngame(argsI) {
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

module.exports = class GameInstance {
  constructor(id, mode, totalTime, increment, initFen) {
    this.id = id;
    this.mode = mode;
    this.totalTime = totalTime * 1000; //in ms
    this.increment = increment * 1000; //in ms
    this.time = { white: this.totalTime, black: this.totalTime };

    this.status = null;

    this.fen = [];
    this.fen.push(initFen);
    this.moves = [];

    this.playerTurn = true; //true = white, false = black
    this.initTime = new Date();
    this.lastRecordedTime = this.initTime;
  }

  getStatus() {
    return this.status;
  }

  nextMove(from, to, fen) {
    // TODO: check if the move is valid => call to ia API

    this.fen.push(fen);
    if (from) this.moves.push({ from: from, to: to });

    const now = new Date();
    const ellapsedTime = now - this.lastRecordedTime;
    const remainingTime = this.playerTurn
      ? this.time.white - ellapsedTime
      : this.time.black - ellapsedTime;

    if (remainingTime <= 0) {
      // lost on time
      this.playerTurn ? (this.time.white = 0) : (this.time.black = 0);
      this.status = (this.playerTurn ? "W" : "B") + "LT";
    } else
      this.playerTurn
        ? (this.time.white = remainingTime + this.increment)
        : (this.time.black = remainingTime + this.increment);

    this.lastRecordedTime = now;
    this.playerTurn = !this.playerTurn;
    this.status = this.playerTurn ? "W" : "B";

    return this.time;
  }
};

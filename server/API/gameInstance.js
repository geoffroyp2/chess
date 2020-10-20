module.exports = class GameInstance {
  constructor(id, mode, totalTime, increment) {
    this.id = id;
    this.mode = mode;
    this.totalTime = totalTime * 1000; //in ms
    this.increment = increment * 1000; //in ms
    this.time = { white: this.totalTime, black: this.totalTime };

    this.moves = [];

    this.playerTurn = true; //true = white, false = black
    this.initTime = new Date();
    this.lastRecordedTime = this.initTime;
  }

  nextMove(from, to) {
    // TODO: check if the move is valid

    this.moves.push({ from: from, to: to });
    const now = new Date();
    const ellapsedTIme = now - this.lastRecordedTime;
    this.playerTurn
      ? (this.time.white = this.time.white - ellapsedTIme + this.increment)
      : (this.time.black = this.time.black - ellapsedTIme + this.increment);

    this.lastRecordedTime = now;
    this.playerTurn = !this.playerTurn;

    return this.time;
  }
};

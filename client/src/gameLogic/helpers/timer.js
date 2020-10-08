// Simple timer wrapper

export default class timer {
  constructor(totalTime) {
    this.lastRecord = new Date();
    this.w = totalTime;
    this.b = totalTime;
    this.playerTurn = "W";
  }

  switchPlayer() {
    //called after each move
    this.playerTurn = this.playerTurn === "W" ? "B" : "W";
  }

  getTime() {
    //update the current counter and returns the time
    // this method is called from the React timer element every 100ms

    const now = new Date();
    const ellapsed = now - this.lastRecord;
    this.lastRecord = now;
    if (this.playerTurn === "W") {
      this.w -= ellapsed;
      if (this.w < 0) this.w = 0;
    } else {
      this.b -= ellapsed;
      if (this.b < 0) this.b = 0;
    }
    return {
      w: Math.floor(this.w / 1000),
      b: Math.floor(this.b / 1000),
    };
  }

  synchronise(whiteTime, blackTime) {
    //update the timer with the response from the API (the API applies the increment if there is one)

    this.lastRecord = new Date();
    this.w = whiteTime;
    this.b = blackTime;
  }
}

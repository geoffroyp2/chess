// Simple timer wrapper

export default class timer {
  constructor() {
    this.lastRecord = new Date();
    this.w = 0;
    this.b = 0;
    this.playerTurn = true;
  }

  switchPlayer() {
    //called after each move
    this.playerTurn = !this.playerTurn;
  }

  getTime() {
    //update the current counter and returns the time
    // this method is called from the React timer element every 100ms
    const now = new Date();
    const ellapsed = now - this.lastRecord;

    this.playerTurn ? (this.w -= ellapsed) : (this.b -= ellapsed);
    this.lastRecord = now;

    if (this.w < 0) this.w = 0;
    if (this.b < 0) this.b = 0;

    return {
      w: this.w,
      b: this.b,
    };
  }

  synchronize(time) {
    //update the timer with the response from the API (the API applies the increment if there is one)
    this.w = time.white;
    this.b = time.black;
    this.lastRecord = new Date();
  }
}

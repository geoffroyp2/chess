import { ClockTime } from "../TSInterfaces/boardData";

// Timer class that stores / updtates time left for each player

export default class Timer {
  lastRecord: Date;
  time: ClockTime;
  playerTurn: boolean;

  constructor() {
    this.time = {
      white: 0,
      black: 0,
    };
    this.playerTurn = true;
    this.lastRecord = new Date();
  }

  synchronize(time: ClockTime, playerTurn: boolean): void {
    //update the timer with the response from the API (the API applies the increment if there is one)
    this.time = time;
    this.playerTurn = playerTurn;
    this.lastRecord = new Date();
  }

  getTime(): ClockTime {
    // update the current time and returns it
    // this method is called from the React timer element every 100ms
    const now: Date = new Date();
    const ellapsed: number = now.getTime() - this.lastRecord.getTime();

    this.playerTurn ? (this.time.white -= ellapsed) : (this.time.black -= ellapsed);
    this.lastRecord = now;

    if (this.time.white < 0) this.time.white = 0;
    if (this.time.black < 0) this.time.black = 0;

    // return a copy so that the UI knows it's a different object (force update)
    return { white: this.time.white, black: this.time.black };
  }
}

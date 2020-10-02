export default class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  isValid() {
    return this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8;
  }

  getString() {
    return String.fromCharCode(this.x + 97) + String.fromCharCode(this.y + 49);
  }
}

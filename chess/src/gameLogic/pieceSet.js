class PieceSet {
  constructor(mode) {
    this.p = [];
    let p = this.p;
    if (mode === "DEFAULT") {
      p.push(new Piece("R", "W", 0, 7, "1"));
      p.push(new Piece("B", "W", 1, 7, "1"));
      p.push(new Piece("N", "W", 2, 7, "1"));
      p.push(new Piece("Q", "W", 3, 7, ""));
      p.push(new Piece("K", "W", 4, 7, ""));
      p.push(new Piece("B", "W", 5, 7, "2"));
      p.push(new Piece("N", "W", 6, 7, "2"));
      p.push(new Piece("R", "W", 7, 7, "2"));
      for (let i = 0; i < 8; i++) p.push(new Piece("P", "W", i, 6, i));

      p.push(new Piece("R", "B", 0, 0, "1"));
      p.push(new Piece("B", "B", 1, 0, "1"));
      p.push(new Piece("N", "B", 2, 0, "1"));
      p.push(new Piece("Q", "B", 3, 0, ""));
      p.push(new Piece("K", "B", 4, 0, ""));
      p.push(new Piece("B", "B", 5, 0, "2"));
      p.push(new Piece("N", "B", 6, 0, "2"));
      p.push(new Piece("R", "B", 7, 0, "2"));
      for (let i = 0; i < 8; i++) p.push(new Piece("P", "B", i, 1, i));
    }
  }
}

export default PieceSet;

class Piece {
  constructor(type, color, x, y, id) {
    this.type = type + color;
    this.coord = { x: x, y: y };
    this.id = this.type + id;
  }
}

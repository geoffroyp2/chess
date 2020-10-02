class Rook extends Piece {
  constructor(...args) {
    super(args);
    this.type = "R";
    this.canCastle = true;
  }

  copy() {
    let newPiece = new Rook(...super.getInfos());
    newPiece.canCastle = this.canCastle;
    return newPiece;
  }

  move(square) {
    this.canCastle = false;
    super.move(square);
  }

  calculateMoves(pieces, loopAmount) {
    this.validMoves.erase();

    let flags = [...Array(4)].fill(true),
      x = this.coordinates.x,
      y = this.coordinates.y;

    let checkLine = (flag, comparison, squareID) => {
      if (flags[flag]) {
        if (comparison()) {
          flags[flag] = false;
        } else {
          let otherPiece = pieces.find(squareID);
          if (otherPiece) {
            if (otherPiece.team != this.team) {
              this.validMoves.add(this, squareID, "X", otherPiece);
            }
            flags[flag] = false;
          } else this.validMoves.add(this, squareID, "M", null);
        }
      }
    };

    for (let i = 1; i < 8; ++i) {
      checkLine(0, () => x - i < 0, this.ctoid(x - i, y));
      checkLine(1, () => x + i > 7, this.ctoid(x + i, y));
      checkLine(2, () => y - i < 0, this.ctoid(x, y - i));
      checkLine(3, () => y + i > 7, this.ctoid(x, y + i));
    }

    // if (!nextTurn)
    super.isCheck(pieces, loopAmount);
  }

  castle() {
    let square;
    switch (this.coordinates.squareId) {
      case 0:
        square = 3;
        break;
      case 7:
        square = 5;
        break;
      case 56:
        square = 59;
        break;
      case 63:
        square = 61;
        break;
    }
    this.move(square);
  }
}

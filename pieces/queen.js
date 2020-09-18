
class Queen extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'Q';
    }

    copy() {
        let newPiece = new Queen(...super.getInfos());
        return newPiece;
    }

    validMoves(pieces) {
        let validMoves = new ValidMoves();

        //DOWN RIGHT DIAGONAL
        let x = this.coordinates.squareId;
        while (x % 8 != 0 && x >= 0) {
            x -= 9;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }
        x = this.coordinates.squareId;
        while (x % 8 != 7 && x < 64) {
            x += 9;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }

        //DOWN LEFT DIAGONAL
        x = this.coordinates.squareId;
        while (x % 8 != 7 && x >= 0) {
            x -= 7;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }
        x = this.coordinates.squareId;
        while (x % 8 != 0 && x < 64) {
            x += 7;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }

        // HORIZONTAL
        x = this.coordinates.squareId;
        while (x % 8 != 7) {
            x++;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }
        x = this.coordinates.squareId;
        while (x % 8 != 0) {
            x--;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }

        //VERTICAL
        x = this.coordinates.squareId;
        while (Math.floor(x / 8) < 8) {
            x += 8;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }
        x = this.coordinates.squareId;
        while (Math.floor(x / 8) >= 0) {
            x -= 8;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.add(x, otherPiece);
                }
                break;
            } else {
                validMoves.add(x);
            }
        }

        return validMoves;
    }
};
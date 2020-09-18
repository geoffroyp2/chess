
class Rook extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'R';
        this.canCastle = true;
    }

    copy() {
        let newPiece = new Rook(...super.getInfos());
        newPiece.canCastle = this.canCastle;
        return newPiece;
    }

    move(square) {
        this.canCastle = false;
        super.move(square)
    }

    validMoves(pieces) {
        let validMoves = new ValidMoves();

        // HORIZONTAL
        let x = this.coordinates.squareId;
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

        return validMoves
    }

    castle() {
        print(this)
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

        this.move(square)
    }

};
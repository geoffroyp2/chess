
class Rook extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'R';
    }

    copy() {
        let newPiece = new Rook(...super.getInfos());
        return newPiece;
    }

    validMoves(pieces) {
        let validMoves = [];

        // HORIZONTAL
        let x = this.coordinates.squareId;
        while (x % 8 != 7) {
            x++;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.push(x);
                }
                break;
            } else {
                validMoves.push(x);
            }
        }
        x = this.coordinates.squareId;
        while (x % 8 != 0) {
            x--;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.push(x);
                }
                break;
            } else {
                validMoves.push(x);
            }
        }

        //VERTICAL
        x = this.coordinates.squareId;
        while (Math.floor(x / 8) < 8) {
            x += 8;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.push(x);
                }
                break;
            } else {
                validMoves.push(x);
            }
        }
        x = this.coordinates.squareId;
        while (Math.floor(x / 8) >= 0) {
            x -= 8;
            let otherPiece = pieces.find(x);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.push(x);
                }
                break;
            } else {
                validMoves.push(x);
            }
        }

        return validMoves
    }

};
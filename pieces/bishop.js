
class Bishop extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'B';
    }

    copy() {
        let newPiece = new Bishop(...super.getInfos());
        return newPiece;
    }

    validMoves(pieces) {
        let validMoves = [];

        //DOWN RIGHT DIAGONAL
        let x = this.coordinates.squareId;
        while (x % 8 != 0 && x >= 0) {
            x -= 9;
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
        while (x % 8 != 7 && x < 64) {
            x += 9;
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

        //DOWN LEFT DIAGONAL
        x = this.coordinates.squareId;
        while (x % 8 != 7 && x >= 0) {
            x -= 7;
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
        while (x % 8 != 0 && x < 64) {
            x += 7;
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
        return validMoves;
    }
};
// TODO : en passant, promotion


class Peon extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'P';
    }

    copy() {
        let newPiece = new Peon(...super.getInfos());
        return newPiece;
    }

    validMoves(pieces) {
        let validMoves = [];

        if (this.team == "W") {
            //VERTICAL
            if (this.coordinates.y == 6) {
                let otherPiece = pieces.find(this.coordinates.squareId - 16);
                if (!otherPiece)
                    validMoves.push(this.coordinates.squareId - 16);
            }
            let otherPiece = pieces.find(this.coordinates.squareId - 8);
            if (!otherPiece)
                validMoves.push(this.coordinates.squareId - 8);

            //CAPTURE
            if (this.coordinates.x > 0 && this.coordinates.y > 0) {
                let otherPiece = pieces.find(this.coordinates.squareId - 9);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        validMoves.push(this.coordinates.squareId - 9);
                    }
                }
            }
            if (this.coordinates.x < 7 && this.coordinates.y > 0) {
                let otherPiece = pieces.find(this.coordinates.squareId - 7);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        validMoves.push(this.coordinates.squareId - 7);
                    }
                }
            }

        } else if (this.team == "B") {
            //VERTICAL
            if (this.coordinates.y == 1) {
                let otherPiece = pieces.find(this.coordinates.squareId + 16);
                if (!otherPiece)
                    validMoves.push(this.coordinates.squareId + 16);
            }
            let otherPiece = pieces.find(this.coordinates.squareId + 8);
            if (!otherPiece)
                validMoves.push(this.coordinates.squareId + 8);

            //CAPTURE
            if (this.coordinates.x > 0 && this.coordinates.y < 7) {
                let otherPiece = pieces.find(this.coordinates.squareId + 7);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        validMoves.push(this.coordinates.squareId + 7);
                    }
                }
            }
            if (this.coordinates.x < 7 && this.coordinates.y < 7) {
                let otherPiece = pieces.find(this.coordinates.squareId + 9);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        validMoves.push(this.coordinates.squareId + 9);
                    }
                }
            }
        }
        return validMoves;
    }
};
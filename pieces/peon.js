// TODO : promotion


class Peon extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'P';
        this.enPassant = 0;
    }

    copy() {
        let newPiece = new Peon(...super.getInfos());
        newPiece.enPassant = this.enPassant > 0 ? this.enPassant - 1 : 0;
        return newPiece;
    }

    move(square) {
        //en passant
        if (this.team == "W") {
            if (this.coordinates.squareId - 16 == square) {
                this.enPassant = 2;
            }
            else
                this.enPassant = 0;

        } else if (this.team == "B") {
            if (this.coordinates.squareId + 16 == square) {
                this.enPassant = 2;
            }
            else
                this.enPassant = 0;
        }

        super.move(square);
    }

    calculateMoves(pieces, nextTurn) {
        this.validMoves.erase();

        if (this.team == "W") {
            //VERTICAL
            if (this.coordinates.y == 6) {
                let otherPiece1 = pieces.find(this.coordinates.squareId - 16);
                let otherPiece2 = pieces.find(this.coordinates.squareId - 8);
                if (!otherPiece1 && !otherPiece2)
                    this.validMoves.add(this, this.coordinates.squareId - 16, "M", null);
            }
            let otherPiece = pieces.find(this.coordinates.squareId - 8);
            if (!otherPiece)
                this.validMoves.add(this, this.coordinates.squareId - 8, "M", null);

            //CAPTURE NORMAL
            if (this.coordinates.x > 0 && this.coordinates.y > 0) {
                let otherPiece = pieces.find(this.coordinates.squareId - 9);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        this.validMoves.add(this, this.coordinates.squareId - 9, "X", otherPiece);
                    } else {
                        this.validMoves.add(this, this.coordinates.squareId - 9, "D", otherPiece);
                    }
                }
            }
            if (this.coordinates.x < 7 && this.coordinates.y > 0) {
                let otherPiece = pieces.find(this.coordinates.squareId - 7);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        this.validMoves.add(this, this.coordinates.squareId - 7, "X", otherPiece);
                    }
                    else {
                        this.validMoves.add(this, this.coordinates.squareId - 7, "D", otherPiece);
                    }
                }
            }

            //CAPTURE EN PASSANT
            if (this.coordinates.x > 0 && this.coordinates.y == 3) {
                let otherPiece = pieces.find(this.coordinates.squareId - 1);
                if (otherPiece) {
                    if (otherPiece.team != this.team && otherPiece.type == "P" && otherPiece.enPassant > 0) {
                        this.validMoves.add(this, this.coordinates.squareId - 9, "X", otherPiece);
                    }
                }
            }
            if (this.coordinates.x < 7 && this.coordinates.y == 3) {
                let otherPiece = pieces.find(this.coordinates.squareId + 1);
                if (otherPiece) {
                    if (otherPiece.team != this.team && otherPiece.type == "P" && otherPiece.enPassant > 0) {
                        this.validMoves.add(this, this.coordinates.squareId - 7, "X", otherPiece);
                    }
                }
            }
        } else if (this.team == "B") {

            //VERTICAL
            if (this.coordinates.y == 1) {
                if (this.coordinates.y == 1) {
                    let otherPiece1 = pieces.find(this.coordinates.squareId + 16);
                    let otherPiece2 = pieces.find(this.coordinates.squareId + 8);
                    if (!otherPiece1 && !otherPiece2)
                        this.validMoves.add(this, this.coordinates.squareId + 16, "M", null);
                }
            }
            let otherPiece = pieces.find(this.coordinates.squareId + 8);
            if (!otherPiece)
                this.validMoves.add(this, this.coordinates.squareId + 8, "M", null);

            //CAPTURE NORMAL
            if (this.coordinates.x > 0 && this.coordinates.y < 7) {
                let otherPiece = pieces.find(this.coordinates.squareId + 7);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        this.validMoves.add(this, this.coordinates.squareId + 7, "X", otherPiece);
                    }
                    else {
                        this.validMoves.add(this, this.coordinates.squareId + 7, "D", otherPiece);
                    }
                }
            }
            if (this.coordinates.x < 7 && this.coordinates.y < 7) {
                let otherPiece = pieces.find(this.coordinates.squareId + 9);
                if (otherPiece) {
                    if (otherPiece.team != this.team) {
                        this.validMoves.add(this, this.coordinates.squareId + 9, "X", otherPiece);
                    }
                    else {
                        this.validMoves.add(this, this.coordinates.squareId + 9, "D", otherPiece);
                    }
                }
            }

            //CAPTURE EN PASSANT
            if (this.coordinates.x > 0 && this.coordinates.y == 4) {
                let otherPiece = pieces.find(this.coordinates.squareId - 1);
                if (otherPiece) {
                    if (otherPiece.team != this.team && otherPiece.type == "P" && otherPiece.enPassant > 0) {
                        this.validMoves.add(this, this.coordinates.squareId + 7, "X", otherPiece);
                    }
                }
            }
            if (this.coordinates.x < 7 && this.coordinates.y == 4) {
                let otherPiece = pieces.find(this.coordinates.squareId + 1);
                if (otherPiece) {
                    if (otherPiece.team != this.team && otherPiece.type == "P" && otherPiece.enPassant > 0) {
                        this.validMoves.add(this, this.coordinates.squareId + 9, "X", otherPiece);
                    }
                }
            }
        }

        if (!nextTurn)
            super.isCheck(pieces);
    }
};
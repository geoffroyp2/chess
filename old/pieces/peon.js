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

    calculateMoves(pieces, loopAmount) {
        this.validMoves.erase();

        let x = this.coordinates.x,
            y = this.coordinates.y,
            team = this.team == "W" ? -1 : +1;

        // NORMAL MOVE
        let otherPiece1 = pieces.find(this.ctoid(x, y + team));
        if (!otherPiece1) {
            //PROMOTION
            if (this.team == "W" && y == 1) {
                this.validMoves.add(this, this.ctoid(x, y + team), "P", null);
            } else if (this.team == "B" && y == 6) {
                this.validMoves.add(this, this.ctoid(x, y + team), "P", null);
            } else {
                this.validMoves.add(this, this.ctoid(x, y + team), "M", null);
            }
        }
        // MOVE 2 SQUARES
        if (y == (this.team == "W" ? 6 : 1)) {
            let otherPiece2 = pieces.find(this.ctoid(x, y + 2 * team));
            if (!otherPiece1 && !otherPiece2)
                this.validMoves.add(this, this.ctoid(x, y + 2 * team), "M", null);
        }

        //CAPTURE LEFT
        if (x > 0) {
            let otherPiece = pieces.find(this.ctoid(x - 1, y + team));
            if (otherPiece)
                if (otherPiece.team != this.team) {
                    // CAPTURE + PROMOTION 
                    if (this.team == "W" && y == 1) {
                        this.validMoves.add(this, this.ctoid(x - 1, y + team), "PX", otherPiece);
                    } else if (this.team == "B" && y == 6) {
                        this.validMoves.add(this, this.ctoid(x - 1, y + team), "PX", otherPiece);
                    } else {
                        this.validMoves.add(this, this.ctoid(x - 1, y + team), "X", otherPiece);
                    }
                }
            //EN PASSANT
            if (y == (this.team == "W" ? 3 : 4)) {
                let otherPiece = pieces.find(this.ctoid(x - 1, y));
                if (otherPiece)
                    if (otherPiece.team != this.team && otherPiece.type == "P" && otherPiece.enPassant > 0)
                        this.validMoves.add(this, this.ctoid(x - 1, y + team), "X", otherPiece);
            }
        }
        //CAPTURE RIGHT
        if (x < 7) {
            let otherPiece = pieces.find(this.ctoid(x + 1, y + team));
            if (otherPiece)
                if (otherPiece.team != this.team) {
                    // CAPTURE + PROMOTION 
                    if (this.team == "W" && y == 1) {
                        this.validMoves.add(this, this.ctoid(x + 1, y + team), "PX", otherPiece);
                    } else if (this.team == "B" && y == 6) {
                        this.validMoves.add(this, this.ctoid(x + 1, y + team), "PX", otherPiece);
                    } else {
                        this.validMoves.add(this, this.ctoid(x + 1, y + team), "X", otherPiece);
                    }
                }
            //EN PASSANT
            if (y == (this.team == "W" ? 3 : 4)) {
                let otherPiece = pieces.find(this.ctoid(x + 1, y));
                if (otherPiece)
                    if (otherPiece.team != this.team && otherPiece.type == "P" && otherPiece.enPassant > 0)
                        this.validMoves.add(this, this.ctoid(x + 1, y + team), "X", otherPiece);
            }
        }

        // if (!nextTurn)
        super.isCheck(pieces, loopAmount);
    }
};
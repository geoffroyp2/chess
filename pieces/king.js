// TODO : castle, avoid check

class King extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'K';
        this.canCastle = true;
    }

    copy() {
        let newPiece = new King(...super.getInfos());
        newPiece.canCastle = this.canCastle;
        return newPiece;
    }

    move(square) {
        this.canCastle = false;
        super.move(square);
    }

    calculateMoves(pieces, nextTurn) {
        this.validMoves.erase();

        let candidateMoves = [],
            x = this.coordinates.x,
            y = this.coordinates.y;

        if (x > 0) {
            candidateMoves.push(this.ctoid(x - 1, y));
            if (y > 0)
                candidateMoves.push(this.ctoid(x - 1, y - 1));
            if (y < 7)
                candidateMoves.push(this.ctoid(x - 1, y + 1));
        }
        if (x < 7) {
            candidateMoves.push(this.ctoid(x + 1, y));
            if (y > 0)
                candidateMoves.push(this.ctoid(x + 1, y - 1));
            if (y < 7)
                candidateMoves.push(this.ctoid(x + 1, y + 1));
        }
        if (y > 0)
            candidateMoves.push(this.ctoid(x, y - 1));
        if (y < 7)
            candidateMoves.push(this.ctoid(x, y + 1));

        for (let i of candidateMoves) {
            let otherPiece = pieces.find(i);
            if (otherPiece) {
                if (otherPiece.team != this.team)
                    this.validMoves.add(this, i, "X", otherPiece);
            } else {
                this.validMoves.add(this, i, "M", null);
            }
        }

        if (this.canCastle) {
            this.validCastle(pieces);
        }

        if (!nextTurn)
            super.isCheck(pieces);
    }


    validCastle(pieces) {

        let checkCastle = (kingEndSquare, rookSquare, blockSquares, checkSquares) => {
            let blocked = false, check = false;
            for (let i of blockSquares)
                if (pieces.find(i)) blocked = true;
            if (!blocked) {
                let rook = pieces.find(rookSquare);
                if (rook) {
                    if (rook.type == "R" && rook.team == this.team && rook.canCastle) {
                        for (let p of pieces.pieces) {
                            if (p.team != this.team) {
                                for (let i of checkSquares) {
                                    if (p.validMoves.includes(i)) check = true;
                                }
                                if (!check) {
                                    this.validMoves.add(this, kingEndSquare, "O", rook);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.team == "B") {
            checkCastle(2, 0, [1, 2, 3], [2, 3, 4]);
            checkCastle(6, 7, [5, 6], [4, 5, 6]);
        } else {
            checkCastle(58, 56, [57, 58, 59], [58, 59, 60]);
            checkCastle(62, 63, [61, 62], [60, 61, 62]);
        }
    }
};
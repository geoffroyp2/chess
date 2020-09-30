class PieceSet {
    constructor() {
        this.pieces = [];
        this.isCheckMate = false;
        this.isStaleMate = false;
        this.isCheck = false;
        this.isSelfCheck = false;
    };

    newGame(setupId) {
        this.fillboard(setupId);
    }

    fillboard(setupId) {
        this.pieces = [];
        if (setupId == "STANDARD") {

            //white set
            this.pieces.push(new King("W", "WK", 60));
            this.pieces.push(new Queen("W", "WQ", 59));
            this.pieces.push(new Bishop("W", "WB1", 58));
            this.pieces.push(new Bishop("W", "WB2", 61));
            this.pieces.push(new Knight("W", "WN1", 57));
            this.pieces.push(new Knight("W", "WN2", 62));
            this.pieces.push(new Rook("W", "WR1", 56));
            this.pieces.push(new Rook("W", "WR2", 63));
            for (let i = 48; i < 56; i++) {
                this.pieces.push(new Peon("W", `WP${i - 47}`, i));
            }

            // // Black set
            this.pieces.push(new King("B", "BK", 4));
            this.pieces.push(new Queen("B", "BQ", 3));
            this.pieces.push(new Bishop("B", "BB1", 2));
            this.pieces.push(new Bishop("B", "BB2", 5));
            this.pieces.push(new Knight("B", "BN1", 1));
            this.pieces.push(new Knight("B", "BN2", 6));
            this.pieces.push(new Rook("B", "BR1", 0));
            this.pieces.push(new Rook("B", "BR2", 7));
            for (let i = 8; i < 16; i++) {
                this.pieces.push(new Peon("B", `BP${i - 7}`, i));
            }
        }
    }

    calculateMoves(playerTurn, loopAmount) {
        for (let p of this.pieces)
            if (!p.removed)
                p.calculateMoves(this, loopAmount);


        //look for check and checkmate
        let selfKing = this.findById(playerTurn + "K");
        let opponentKing = this.findById((playerTurn == "W" ? "B" : "W") + "K");
        let atLeastOneValidMove = false;

        for (let p of this.pieces) {
            if (p.team == playerTurn) {
                if (p.validMoves.size() > 0) {
                    atLeastOneValidMove = true;
                    if (p.validMoves.find(opponentKing.coordinates.squareId))
                        this.isSelfCheck = true;
                }
            } else {
                if (p.validMoves.find(selfKing.coordinates.squareId))
                    this.isCheck = true;
            }
        }

        if (!atLeastOneValidMove) {
            if (this.isCheck)
                this.isCheckMate = true;
            else
                this.isStaleMate = true;
        }
    }


    find(squareId) {
        return this.pieces.find(elem => elem.coordinates.squareId == squareId);
    }

    findById(id) {
        return this.pieces.find(elem => elem.id == id);
    }

    splice(id) {
        let piece = this.findById(id);
        this.pieces.splice(this.pieces.indexOf(piece), 1);
        return piece;
    }

    getMoves(playerTurn, pieceType) {
        let moves = [];
        for (let p of this.pieces)
            if (p.team == playerTurn && p.type == pieceType) {
                if (p.validMoves.moves.length > 0) {
                    for (let m of p.validMoves.moves)
                        moves.push(m)
                }
            }
        return moves;
    }

    copy() {
        //Deep copy of pieces
        let newPieces = new PieceSet();
        for (let p of this.pieces) {
            newPieces.pieces.push(p.copy());
        }
        return newPieces
    }

    draw(pSelected) {
        for (let p of this.pieces) {
            p.draw(p == pSelected);
        }
    }
}
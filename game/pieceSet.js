class PieceSet {
    constructor() {
        this.pieces = [];
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
            // this.pieces.push(new Bishop("W", "WB2", 61));
            // this.pieces.push(new Knight("W", "WN1", 57));
            // this.pieces.push(new Knight("W", "WN2", 62));
            this.pieces.push(new Rook("W", "WR1", 56));
            this.pieces.push(new Rook("W", "WR2", 63));
            for (let i = 48; i < 56; i++) {
                this.pieces.push(new Peon("W", `WP${i - 47}`, i));
            }

            // Black set
            this.pieces.push(new King("B", "BK", 4));
            // this.pieces.push(new Queen("B", "BQ", 3));
            // this.pieces.push(new Bishop("B", "BB1", 2));
            // this.pieces.push(new Bishop("B", "BB2", 5));
            // this.pieces.push(new Knight("B", "BN1", 1));
            // this.pieces.push(new Knight("B", "BN2", 6));
            this.pieces.push(new Rook("B", "BR1", 0));
            this.pieces.push(new Rook("B", "BR2", 7));
            for (let i = 8; i < 16; i++) {
                this.pieces.push(new Peon("B", `BP${i - 7}`, i));
            }
        }
    }

    find(squareId) {
        return this.pieces.find(elem => elem.coordinates.squareId == squareId);
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
class PieceSet {
    constructor() {
        this.pieces = {
            white: [],
            black: []
        }
    };

    fillboard(setupId) {
        if (setupId == "STANDARD") {
            //white set
            this.pieces.white.push(new King("W", "WK", 60));
            this.pieces.white.push(new Queen("W", "WQ", 59));
            this.pieces.white.push(new Bishop("W", "WB1", 58));
            this.pieces.white.push(new Bishop("W", "WB2", 61));
            this.pieces.white.push(new Knight("W", "WN1", 57));
            this.pieces.white.push(new Knight("W", "WN2", 62));
            this.pieces.white.push(new Rook("W", "WR1", 56));
            this.pieces.white.push(new Rook("W", "WR2", 63));
            for (let i = 48; i < 56; i++) {
                this.pieces.white.push(new Peon("W", `WP${i}`, i));
            }

            // Black set
            this.pieces.black.push(new King("B", "BK", 4));
            this.pieces.black.push(new Queen("B", "BQ", 3));
            this.pieces.black.push(new Bishop("B", "BB1", 2));
            this.pieces.black.push(new Bishop("B", "BB2", 5));
            this.pieces.black.push(new Knight("B", "BN1", 1));
            this.pieces.black.push(new Knight("B", "BN2", 6));
            this.pieces.black.push(new Rook("B", "BR1", 0));
            this.pieces.black.push(new Rook("B", "BR2", 7));
            for (let i = 8; i < 16; i++) {
                this.pieces.black.push(new Peon("B", `BP${i}`, i));
            }
        }
    }
}
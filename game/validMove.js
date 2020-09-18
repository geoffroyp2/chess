class ValidMoves {
    constructor(destination, otherPiece) {
        this.moves = [];
    }

    add(destination, otherPiece, rookCastle) {
        this.moves.push(new ValidMove(destination, otherPiece, rookCastle));
    }

    includes(squareId) {
        for (let m of this.moves) {
            if (m.to == squareId)
                return true;
        }
        return false;
    }

    find(squareId) {
        for (let m of this.moves) {
            if (m.to == squareId)
                return m;
        }
        return null;
    }
};

class ValidMove {
    constructor(destination, otherPiece, rookCastle) {
        this.to = destination;
        this.type = "M";
        this.capture = null;

        if (rookCastle) {
            this.type = "O";
            this.capture = rookCastle;
        }

        if (otherPiece) {
            this.type = "X";
            this.capture = otherPiece;
        }
    }
};
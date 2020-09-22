class ValidMoves {
    constructor() {
        this.moves = [];
    }

    erase() {
        this.moves = [];
    }

    add(piece, destination, type, otherPiece) {
        this.moves.push(new ValidMove(piece, destination, type, otherPiece));
    }

    includes(squareId) {
        for (let m of this.moves) {
            if (m.to == squareId)
                return true;
        }
        return false;
    }

    canCapture(squareId) {
        for (let m of this.moves) {
            if (m.to == squareId && (m.type == "X" || m.type == "PX")) {
                return true;
            }
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

    size() {
        return this.moves.length;
    }
};

class ValidMove {
    constructor(piece, destination, type, otherPiece) {
        this.piece = piece;
        this.type = type
        this.to = destination;
        this.otherPiece = otherPiece;
    }

    copyMove(newPieces) {
        //Copy the move to another piece set
        let newMove = new ValidMove(null, this.to, this.type, null);
        for (let p of newPieces.pieces) {
            if (p.id == this.piece.id) {
                newMove.piece = p;
            }
            if (this.otherPiece)
                if (p.id == this.otherPiece.id) {
                    newMove.otherPiece = p;
                }
        }
        return newMove;
    }

    executeMove(simulationMode) {
        switch (this.type) {
            case "M":
                this.piece.move(this.to);
                if (!simulationMode) print(this.piece.id, "moving to", this.to);
                break;
            case "X":
                this.otherPiece.remove();
                this.piece.move(this.to);
                if (!simulationMode) print(this.piece.id, "capturing", this.otherPiece.id, "on square", this.to);
                break;
            case "O":
                this.piece.move(this.to);
                this.otherPiece.castle();
                if (!simulationMode) print(this.piece.id, "castling with", this.otherPiece.id, "towards square", this.to);
                break;
            case "P":
                // Promotion is handled as a normal move then the peon is changed into another one by GameState
                this.piece.move(this.to);
                if (!simulationMode) print(this.piece.id, "promoted on square", this.to);
                break;
            case "PX":
                this.otherPiece.remove();
                this.piece.move(this.to);
                print(this.piece.id, "promoted on square", this.to, "capturing ", this.otherPiece.id);
                break;

        }
    }
};
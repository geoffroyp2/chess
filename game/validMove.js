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
            if (m.type != "D" && m.to == squareId)
                return true;
        }
        return false;
    }

    isDefending(squareId) {
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
            case "D":
                if (!simulationMode) print("case D Should never happen");
                break;
        }
    }
};
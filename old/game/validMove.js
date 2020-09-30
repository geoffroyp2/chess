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
        this.resultingState = null;
        this.isCheck = false;
        this.isCheckMate = false;
    }

    makePGN(allValidMoves, isCheck, promotionChosen) {
        let pgnString = "";
        if (this.type == "O") {
            if (this.to % 8 == 6)
                pgnString = "O-O";
            if (this.to % 8 == 2)
                pgnString = "O-O-O";
        } else {

            if (this.piece.type != "P") pgnString += this.piece.type;

            //separate same move from 2 different pieces
            if (this.piece.type != "P") {
                for (let p of allValidMoves) {
                    if (p != this)
                        if (p.to == this.to)
                            if (p.piece.type == this.piece.type) {
                                //if same file, separate by rank
                                if (p.piece.coordinates.x == this.piece.coordinates.x)
                                    pgnString += this.idToPGN(false, true);
                                // separate by file by default
                                else
                                    pgnString += this.idToPGN(true, false);
                                break;
                            }
                }
            }

            if (this.type == "X" || this.type == "PX") {
                if (this.piece.type == "P")
                    pgnString += this.idToPGN(true, false, true)
                pgnString += "x";
            }
            pgnString += this.idToPGN(true, true);

            if (this.type == "P" || this.type == "PX") {
                pgnString += "=";
                pgnString += promotionChosen;
            }
        }

        if (isCheck)
            pgnString += "+";

        return pgnString;
    }

    idToPGN(needX, needY, from) {
        let x, y;
        if (from) {
            x = needX ? String.fromCharCode(this.piece.previousSquare % 8 + + 97) : '';
            y = needY ? String.fromCharCode(8 - Math.floor(this.piece.previousSquare / 8) + 48) : '';
        } else {
            x = needX ? String.fromCharCode(this.to % 8 + + 97) : '';
            y = needY ? String.fromCharCode(8 - Math.floor(this.to / 8) + 48) : '';
        }
        return x + y;
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
        this.piece.previousSquare = this.piece.coordinates.squareId;
        switch (this.type) {
            case "M":
                this.piece.move(this.to);
                // if (!simulationMode) print(this.piece.id, "moving to", this.to);
                break;
            case "X":
                this.otherPiece.remove();
                this.piece.move(this.to);
                // if (!simulationMode) print(this.piece.id, "capturing", this.otherPiece.id, "on square", this.to);
                break;
            case "O":
                this.piece.move(this.to);
                this.otherPiece.castle();
                // if (!simulationMode) print(this.piece.id, "castling with", this.otherPiece.id, "towards square", this.to);
                break;
            case "P":
                // Promotion is handled as a normal move then the peon is changed into another one by GameState
                // in simulation mode, every possible promotion is added (TODO)
                this.piece.move(this.to);
                // if (!simulationMode) print(this.piece.id, "promoted on square", this.to);
                break;
            case "PX":
                this.otherPiece.remove();
                this.piece.move(this.to);
                // if (!simulationMode) print(this.piece.id, "promoted on square", this.to, "capturing ", this.otherPiece.id);
                break;
        }
    }
};
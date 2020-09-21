class Piece {
    constructor([team, id, square]) {
        this.team = team;
        this.color = team == "W" ? color(255, 255, 255) : color(0, 0, 0);
        this.id = id;

        this.validMoves = new ValidMoves();

        this.coordinates = { x: -1, y: -1, squareId: square };
        this.move(square);
    }

    getInfos() {
        //Used for deep copy of pieces, along with individual copy() methods
        return [this.team, this.id, this.coordinates.squareId];
    }

    move(square) {
        this.coordinates.squareId = square;
        this.coordinates.x = square % 8;
        this.coordinates.y = Math.floor(square / 8);
    }

    ctoid(x, y) {
        return y * 8 + x;
    }
    idtoc(id) {
        return [id % 8, Math.floor(id / 8)];
    }

    isCheck(pieces) {
        // for (let idx in this.validMoves.moves) {
        //     if (this.validMoves.moves[idx].type != "D") {
        //         // print(this.validMoves.moves[idx])

        //         let isValid = true;
        //         let pieceCopy = pieces.copy();
        //         let newMove = this.validMoves.moves[idx].copyMove(pieceCopy);

        //         newMove.executeMove(true);
        //         let king = pieceCopy.findById(this.team == "W" ? "WK" : "BK");

        //         pieceCopy.calculateMoves(true);

        //         for (let p of pieces.pieces) {
        //             if (p.team != this.team && p.validMoves.includes(king.coordinates.squareId)) {
        //                 print(p)
        //                 isValid = false;
        //                 break;
        //             }
        //         }
        //         if (!isValid) {
        //             print(this.validMoves.moves[idx], "would be check");
        //             this.validMoves.moves.splice(idx, 1);
        //         }
        //     }
        // }
    }

    remove() {
        this.removed = true;
        this.coordinates.x = -1;
        this.coordinates.y = -1;
        this.coordinates.squareId = -1;
    }

    draw(highlight) {
        if (!this.removed) {
            fill(this.color).textSize(80);
            noStroke();
            if (highlight) {
                strokeWeight(3);
                stroke(210, 0, 0);
            }
            text(this.type, this.coordinates.x * 100 + 50, this.coordinates.y * 100 + 80);
        }
    }
};
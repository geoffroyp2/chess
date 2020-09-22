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
        // To eliminate moves that would result in a check. For each move, generate the resulting board state then look for checks


        let moves = this.validMoves.moves;

        //loop backwards to be able to work with splice
        for (let i = moves.length - 1; i >= 0; i--) {
            if (moves[i].type != "O") {
                let isValid = true;
                let pieceCopy = pieces.copy();
                let newMove = moves[i].copyMove(pieceCopy);
                newMove.executeMove(true);
                pieceCopy.calculateMoves(true);
                let king = pieceCopy.findById(this.team == "W" ? "WK" : "BK");

                for (let p of pieceCopy.pieces) {
                    if (p.team != this.team && p.validMoves.includes(king.coordinates.squareId)) {
                        isValid = false;
                        break;
                    }
                }

                if (!isValid) {
                    // print(moves[i], "would be check");
                    moves.splice(i, 1);
                }
            }
        }
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
            // text(this.type, this.coordinates.x * 100 + 50, this.coordinates.y * 100 + 80);
            // image(pieceIcons60px[`${this.id.substr(0, 2)}`], this.coordinates.x * 100 + 10, this.coordinates.y * 100 + 10, 80, 80)
            image(pieceIconsHD[`${this.id.substr(0, 2)}`], this.coordinates.x * 100 + 5, this.coordinates.y * 100 + 5, 90, 90)

        }
    }
};
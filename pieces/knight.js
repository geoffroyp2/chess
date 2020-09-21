
class Knight extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'N';
    }

    copy() {
        let newPiece = new Knight(...super.getInfos());
        return newPiece;
    }

    calculateMoves(pieces, nextTurn) {
        this.validMoves.erase();
        let candidateMoves = [];

        if (this.coordinates.x > 1) {
            if (this.coordinates.y > 0)
                candidateMoves.push(this.coordinates.squareId - 10);
            if (this.coordinates.y < 7)
                candidateMoves.push(this.coordinates.squareId + 6);
        }
        if (this.coordinates.x > 0) {
            if (this.coordinates.y > 1)
                candidateMoves.push(this.coordinates.squareId - 17)
            if (this.coordinates.y < 6)
                candidateMoves.push(this.coordinates.squareId + 15)
        }

        if (this.coordinates.x < 6) {
            if (this.coordinates.y > 0)
                candidateMoves.push(this.coordinates.squareId - 6);
            if (this.coordinates.y < 7)
                candidateMoves.push(this.coordinates.squareId + 10);
        }
        if (this.coordinates.x < 7) {
            if (this.coordinates.y > 1)
                candidateMoves.push(this.coordinates.squareId - 15)
            if (this.coordinates.y < 6)
                candidateMoves.push(this.coordinates.squareId + 17)
        }

        for (let i of candidateMoves) {
            let otherPiece = pieces.find(i);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    this.validMoves.add(this, i, "X", otherPiece);
                } else {
                    this.validMoves.add(this, i, "D", otherPiece);
                }
            } else {
                this.validMoves.add(this, i, "M", null);
            }
        }

        if (!nextTurn)
            super.isCheck(pieces);
    }
};
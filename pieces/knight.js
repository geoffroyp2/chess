
class Knight extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'N';
    }

    copy() {
        let newPiece = new Knight(...super.getInfos());
        return newPiece;
    }


    calculateMoves(pieces, loopAmount) {
        this.validMoves.erase();

        let candidateMoves = [],
            x = this.coordinates.x,
            y = this.coordinates.y;

        if (x > 1) {
            if (y > 0) candidateMoves.push(this.coordinates.squareId - 10);
            if (y < 7) candidateMoves.push(this.coordinates.squareId + 6);
        }
        if (x > 0) {
            if (y > 1) candidateMoves.push(this.coordinates.squareId - 17)
            if (y < 6) candidateMoves.push(this.coordinates.squareId + 15)
        }
        if (x < 6) {
            if (y > 0) candidateMoves.push(this.coordinates.squareId - 6);
            if (y < 7) candidateMoves.push(this.coordinates.squareId + 10);
        }
        if (x < 7) {
            if (y > 1) candidateMoves.push(this.coordinates.squareId - 15)
            if (y < 6) candidateMoves.push(this.coordinates.squareId + 17)
        }

        for (let i of candidateMoves) {
            let otherPiece = pieces.find(i);
            if (otherPiece) {
                if (otherPiece.team != this.team)
                    this.validMoves.add(this, i, "X", otherPiece);
            } else {
                this.validMoves.add(this, i, "M", null);
            }
        }

        // if (!nextTurn)
        super.isCheck(pieces, loopAmount);
    }
};
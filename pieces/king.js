// TODO : castle, avoid check

class King extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'K';
    }

    copy() {
        let newPiece = new King(...super.getInfos());
        return newPiece;
    }

    validMoves(pieces) {
        let candidateMoves = [], validMoves = [];

        if (this.coordinates.squareId % 8 != 0) {
            candidateMoves.push(this.coordinates.squareId - 1);
            candidateMoves.push(this.coordinates.squareId - 9);
            candidateMoves.push(this.coordinates.squareId + 7);
        }
        if (this.coordinates.squareId % 8 != 7) {
            candidateMoves.push(this.coordinates.squareId + 1);
            candidateMoves.push(this.coordinates.squareId + 9);
            candidateMoves.push(this.coordinates.squareId - 7);
        }
        candidateMoves.push(this.coordinates.squareId + 8);
        candidateMoves.push(this.coordinates.squareId - 8);

        for (let i of candidateMoves) {
            let otherPiece = pieces.find(i);
            if (otherPiece) {
                if (otherPiece.team != this.team) {
                    validMoves.push(i);
                }
            } else {
                validMoves.push(i);
            }
        }

        return validMoves;
    }
};
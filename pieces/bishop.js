
class Bishop extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'B';
    }

    copy() {
        let newPiece = new Bishop(...super.getInfos());
        return newPiece;
    }

    calculateMoves(pieces, loopAmount) {
        this.validMoves.erase();

        let flags = [...Array(4)].fill(true),
            x = this.coordinates.x,
            y = this.coordinates.y;

        let checkLine = (flag, comparison, squareID) => {
            if (flags[flag]) {
                if (comparison()) {
                    flags[flag] = false;
                } else {
                    let otherPiece = pieces.find(squareID);
                    if (otherPiece) {
                        if (otherPiece.team != this.team) {
                            this.validMoves.add(this, squareID, "X", otherPiece);
                        }
                        flags[flag] = false;
                    }
                    else this.validMoves.add(this, squareID, "M", null);
                }
            }
        }

        for (let i = 1; i < 8; ++i) {
            checkLine(0, () => x - i < 0 || y - i < 0, this.ctoid(x - i, y - i));
            checkLine(1, () => x + i > 7 || y - i < 0, this.ctoid(x + i, y - i));
            checkLine(2, () => x - i < 0 || y + i > 7, this.ctoid(x - i, y + i));
            checkLine(3, () => x + i > 7 || y + i > 7, this.ctoid(x + i, y + i));
        }

        // if (!nextTurn)
        super.isCheck(pieces, loopAmount);
    }
};
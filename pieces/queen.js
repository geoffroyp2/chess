
class Queen extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'Q';
    }

    copy() {
        let newPiece = new Queen(...super.getInfos());
        return newPiece;
    }

    calculateMoves(pieces, nextTurn) {
        this.validMoves.erase();

        let flags = [...Array(8)].fill(true),
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
            checkLine(0, () => x - i < 0, this.ctoid(x - i, y));
            checkLine(1, () => x + i > 7, this.ctoid(x + i, y));
            checkLine(2, () => y - i < 0, this.ctoid(x, y - i));
            checkLine(3, () => y + i > 7, this.ctoid(x, y + i));
            checkLine(4, () => x - i < 0 || y - i < 0, this.ctoid(x - i, y - i));
            checkLine(5, () => x + i > 7 || y - i < 0, this.ctoid(x + i, y - i));
            checkLine(6, () => x - i < 0 || y + i > 7, this.ctoid(x - i, y + i));
            checkLine(7, () => x + i > 7 || y + i > 7, this.ctoid(x + i, y + i));
        }

        if (!nextTurn)
            super.isCheck(pieces);
    }
};
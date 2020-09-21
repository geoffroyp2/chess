// TODO : castle, avoid check

class King extends Piece {
    constructor(...args) {
        super(args)
        this.type = 'K';
        this.canCastle = true;
    }

    copy() {
        let newPiece = new King(...super.getInfos());
        newPiece.canCastle = this.canCastle;
        return newPiece;
    }

    move(square) {
        this.canCastle = false;
        super.move(square);
    }

    calculateMoves(pieces, nextTurn) {
        this.validMoves.erase();
        let candidateMoves = [];

        // POSSIBLE MOVES
        let LEFT = this.coordinates.x == 0;
        let TOP = this.coordinates.y == 0;
        let BOT = this.coordinates.y == 7;
        let RIGHT = this.coordinates.x == 7;

        if (!LEFT) {
            candidateMoves.push(this.coordinates.squareId - 1);
            if (!TOP)
                candidateMoves.push(this.coordinates.squareId - 9);
            if (!BOT)
                candidateMoves.push(this.coordinates.squareId + 7);
        }
        if (!RIGHT) {
            candidateMoves.push(this.coordinates.squareId + 1);
            if (!TOP)
                candidateMoves.push(this.coordinates.squareId - 7);
            if (!BOT)
                candidateMoves.push(this.coordinates.squareId + 9);
        }
        if (!TOP)
            candidateMoves.push(this.coordinates.squareId - 8);
        if (!BOT)
            candidateMoves.push(this.coordinates.squareId + 8);

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


        // let validMoves = new ValidMoves();
        // if (!antiLoop && this.canCastle) {
        //     this.validCastle(pieces, validMoves);
        // }
        if (!nextTurn)
            super.isCheck(pieces);
    }


    validCastle(pieces, validMoves) {
        //CASTLE
        if (this.team == "W") {
            //WHITE SHORT CASTLE
            if (!pieces.find(61) && !pieces.find(62)) {
                let rook = pieces.find(63);
                if (rook) {
                    if (rook.type == "R" && rook.team == "W" && rook.canCastle) {
                        let isCheck = false;
                        for (let p of pieces.pieces) {
                            if (p.team == "B") {
                                // //to avoid infinite loop
                                // if (p.type == "K" && p.coordinates.y < 6)
                                //     continue;

                                let otherPieceValidMoves = p.calculateMoves(pieces, true);
                                if (otherPieceValidMoves.includes(60) || otherPieceValidMoves.includes(61) || otherPieceValidMoves.includes(62)) {
                                    isCheck = true;
                                }
                            }
                        }
                        if (!isCheck) {
                            print(rook)
                            validMoves.add(62, null, rook);
                        }
                    }
                }
            }
            //WHITE LONG CASTLE
            if (!pieces.find(59) && !pieces.find(58) && !pieces.find(57)) {
                let rook = pieces.find(56);
                if (rook) {
                    if (rook.type == "R" && rook.team == "W" && rook.canCastle) {
                        let isCheck = false;
                        for (let p of pieces.pieces) {
                            if (p.team == "B") {
                                // //to avoid infinite loop
                                // if (p.type == "K" && p.coordinates.y < 6)
                                //     continue;

                                let otherPieceValidMoves = p.calculateMoves(pieces, true);
                                if (otherPieceValidMoves.includes(60) || otherPieceValidMoves.includes(59) || otherPieceValidMoves.includes(58)) {
                                    isCheck = true;
                                }
                            }
                        }
                        if (!isCheck) {
                            print(rook)
                            validMoves.add(62, null, rook);
                        }
                    }
                }
            }
        }
        if (this.team == "B") {
            //BLACK SHORT CASTLE
            if (!pieces.find(5) && !pieces.find(6)) {
                let rook = pieces.find(7);
                if (rook) {
                    if (rook.type == "R" && rook.team == "B" && rook.canCastle) {
                        let isCheck = false;
                        for (let p of pieces.pieces) {
                            if (p.team == "W") {
                                // //to avoid infinite loop
                                // if (p.type == "K" && p.coordinates.y > 1)
                                //     continue;

                                let otherPieceValidMoves = p.calculateMoves(pieces, true);
                                if (otherPieceValidMoves.includes(4) || otherPieceValidMoves.includes(5) || otherPieceValidMoves.includes(6)) {
                                    isCheck = true;
                                }
                            }
                        }
                        if (!isCheck) {
                            print(rook)
                            validMoves.add(6, null, rook);
                        }
                    }
                }
            }
            //BLACK LONG CASTLE
            if (!pieces.find(3) && !pieces.find(2) && !pieces.find(1)) {
                let rook = pieces.find(0);
                if (rook) {
                    if (rook.type == "R" && rook.team == "B" && rook.canCastle) {
                        let isCheck = false;
                        for (let p of pieces.pieces) {
                            if (p.team == "W") {
                                // //to avoid infinite loop
                                // if (p.type == "K" && p.coordinates.y > 1)
                                //     continue;

                                let otherPieceValidMoves = p.calculateMoves(pieces, true);
                                if (otherPieceValidMoves.includes(4) || otherPieceValidMoves.includes(3) || otherPieceValidMoves.includes(2)) {
                                    isCheck = true;
                                }
                            }
                        }
                        if (!isCheck) {
                            print(rook)
                            validMoves.add(2, null, rook);
                        }
                    }
                }
            }
        }
    }
};
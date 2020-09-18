class Board {
    constructor() {
        this.squares = [...Array(64)].map((x, idx) => new Square(idx));
        this.pieces = new PieceSet();


        this.pieces.fillBoard();
        this.recordState();
        this.draw();

        // this.pieces = [];
        // this.boardState = {
        //     playerTurn: "W",
        //     lastHighlight: 0,
        //     pSelected: null,
        //     validMoves: [],
        //     historyMode: false,
        //     historyIdx: -1,
        //     historyLength: 0
        // };
    }

    reset() {
        this.pieces = [];
        this.boardState = {
            playerTurn: "W",
            lastHighlight: 0,
            pSelected: null,
            validMoves: [],
            historyMode: false,
            historyIdx: -1,
            historyLength: 0
        };
        this.fillBoard();
        this.recordState();
        this.draw();
    }

    // fillBoard() {

    // // FULL SET
    // // White set
    // this.pieces.push(new King("W", "WK", 60));
    // this.pieces.push(new Queen("W", "WQ", 59));
    // this.pieces.push(new Bishop("W", "WB1", 58));
    // this.pieces.push(new Bishop("W", "WB2", 61));
    // this.pieces.push(new Knight("W", "WN1", 57));
    // this.pieces.push(new Knight("W", "WN2", 62));
    // this.pieces.push(new Rook("W", "WR1", 56));
    // this.pieces.push(new Rook("W", "WR2", 63));
    // for (let i = 48; i < 56; i++) {
    // this.pieces.push(new Peon("W", `WP${i}`, i));
    // }

    // // Black set
    // this.pieces.push(new King("B", "BK", 4));
    // this.pieces.push(new Queen("B", "BQ", 3));
    // this.pieces.push(new Bishop("B", "BB1", 2));
    // this.pieces.push(new Bishop("B", "BB2", 5));
    // this.pieces.push(new Knight("B", "BN1", 1));
    // this.pieces.push(new Knight("B", "BN2", 6));
    // this.pieces.push(new Rook("B", "BR1", 0));
    // this.pieces.push(new Rook("B", "BR2", 7));
    // for (let i = 8; i < 16; i++) {
    // this.pieces.push(new Peon("B", `BP${i}`, i));
    // }
    // }

    click(x, y) {
        if (!this.boardState.historyMode) {
            let squareId = (Math.floor(y / 100) * 8 + Math.floor(x / 100));
            this.updateBoardState(squareId);
            this.draw();
        }
    }

    keyPress(key) {
        this.boardState.historyMode = true;

        switch (key) {
            case "ArrowRight":
                if (this.boardState.historyIdx < this.boardState.historyLength - 1)
                    this.boardState.historyIdx++;
                break;
            case "ArrowLeft":
                if (this.boardState.historyIdx > 0)
                    this.boardState.historyIdx--;
                break;
            case "ArrowUp":
                this.boardState.historyIdx = 0;
                break;
            case "ArrowDown":
                this.boardState.historyIdx = this.boardState.historyLength - 1;
                break;
        }

        if (this.boardState.historyIdx == this.boardState.historyLength - 1) {
            this.boardState.historyMode = false;
        }

        this.draw();
    }

    recordState() {
        for (let p of this.pieces) {
            p.recordState();
        }
        this.boardState.historyLength++;
        this.boardState.historyIdx++;
    }

    updateBoardState(squareId) {

        //select piece
        let pieceClicked = this.pieces.find(elem => elem.coordinates.squareId == squareId);

        if (this.boardState.pSelected) {
            if (this.boardState.validMoves.includes(squareId)) {
                this.capture(squareId);
                this.boardState.pSelected.move(squareId);

                this.recordState();
                this.boardState.playerTurn = this.boardState.playerTurn == "W" ? "B" : "W";
            }
            this.boardState.pSelected = null;
            this.boardState.validMoves = [];
        } else {
            if (pieceClicked) {
                if (pieceClicked.team == this.boardState.playerTurn) {
                    this.boardState.pSelected = pieceClicked;
                    this.boardState.validMoves = this.boardState.pSelected.validMoves(this.pieces);
                }
            }
        }
    }

    capture(squareId) {
        let captured = this.pieces.find(elem => elem.coordinates.squareId == squareId);
        if (captured) {
            if (captured.type == "K") {

                /* GAME OVER*/

            } else {
                captured.remove();
            }
        }
    }

    draw() {
        if (!this.boardState.historyMode) {
            for (let s of this.squares) {
                s.draw(this.boardState.validMoves.includes(s.id));
            }
            for (let p of this.pieces) {
                p.draw(p == this.boardState.pSelected);
            }
        } else {
            for (let s of this.squares) {
                s.draw(false);
            }
            for (let p of this.pieces) {
                p.drawHistory(this.boardState.historyIdx);
            }
        }
    }
}
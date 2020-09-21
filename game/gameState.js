class GameState {
    constructor(playerTurn) {
        this.pieces = new PieceSet();

        this.playerTurn = playerTurn;
        this.historyMode = false;
        this.pSelected = null;
        // this.validMoves = new ValidMoves();
    }

    newGame() {
        this.pieces.newGame("STANDARD");
    }

    calculateMoves() {
        this.pieces.calculateMoves();
    }

    click(squareId) {
        let pieceMoved = false;

        let pieceClicked = this.pieces.find(squareId);

        // print(pieceClicked)

        if (this.pSelected) {
            let moveSelected = this.pSelected.validMoves.find(squareId);
            if (moveSelected) {
                if (moveSelected.type != "D") {
                    // Don't actually play protecting moves
                    moveSelected.executeMove();
                    this.nextPlayer();
                    pieceMoved = true;
                }
            }
            this.pSelected = null;

        } else {
            if (pieceClicked) {
                if (pieceClicked.team == this.playerTurn) {
                    this.pSelected = pieceClicked;
                }
            }
        }
        return pieceMoved;
    }

    isAValidMove(squareId) {
        if (this.pSelected) {
            return this.pSelected.validMoves.includes(squareId);
        }
        return false;
    }

    nextPlayer() {
        if (this.playerTurn == "W")
            this.playerTurn = "B";
        else if (this.playerTurn == "B")
            this.playerTurn = "W";
    }

    draw() {
        this.pieces.draw(this.pSelected);
    }
};
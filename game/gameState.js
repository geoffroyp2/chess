class GameState {
    constructor(playerTurn) {
        this.pieces = new PieceSet();

        this.playerTurn = playerTurn;
        this.historyMode = false;
        this.pSelected = null;
        this.validMoves = new ValidMoves();
    }

    newGame() {
        this.pieces.newGame("STANDARD");
    }

    click(squareId) {
        let pieceMoved = false;

        let pieceClicked = this.pieces.find(squareId);

        print(pieceClicked)

        if (this.pSelected) {
            if (this.validMoves.includes(squareId)) {
                this.move(squareId);
                pieceMoved = true;
            }
            this.pSelected = null;
            this.validMoves = new ValidMoves();

        } else {
            if (pieceClicked) {
                if (pieceClicked.team == this.playerTurn) {
                    this.pSelected = pieceClicked;
                    this.validMoves = this.pSelected.validMoves(this.pieces);
                }
            }
        }
        return pieceMoved;
    }

    move(squareId) {
        let moveSelected = this.validMoves.find(squareId);
        if (moveSelected.type == "X") {
            //CAPTURE
            if (moveSelected.capture.type == "K") {
                /* GAME OVER */
            }
            moveSelected.capture.remove();
            this.pSelected.move(moveSelected.to);
        }
        else if (moveSelected.type == "O") {
            print("castle")
            //CASTLE
            this.pSelected.move(moveSelected.to);
            moveSelected.capture.castle()
        } else {
            //REGULAR MOVE
            this.pSelected.move(moveSelected.to);
        }

        this.nextPlayer();
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
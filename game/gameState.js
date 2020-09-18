class GameState {
    constructor(playerTurn) {
        this.pieces = new PieceSet();

        this.playerTurn = playerTurn;
        this.historyMode = false;
        this.pSelected = null;
        this.validMoves = [];

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

    newGame() {
        this.pieces.newGame("STANDARD");
    }

    click(squareId) {
        let pieceMoved = false;

        let pieceClicked = this.pieces.find(squareId);

        if (this.pSelected) {
            if (this.validMoves.includes(squareId)) {
                this.capture(pieceClicked);
                this.pSelected.move(squareId);
                this.nextPlayer();
                pieceMoved = true;
            }
            this.pSelected = null;
            this.validMoves = [];
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

    capture(pieceClicked) {
        if (pieceClicked) {
            if (pieceClicked.type == "K") {

                /* GAME OVER*/

            }
            pieceClicked.remove();
        }
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
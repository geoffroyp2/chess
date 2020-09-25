class Game {
    constructor() {
        this.state = new GameState("W");
        this.history = new GameHistory();
        this.pgn = new PGN();


        this.displayState = null;

        this.state.newGame("STANDARD");
        this.history.record(this.state);
        this.copyState();
    };

    reset() {
        this.state = new GameState("W");
        this.history = new GameHistory();
        this.displayState = null;

        this.state.newGame("STANDARD");
        this.history.record(this.state);
        this.copyState();
    }

    click(x, y) {
        let pieceMoved = false;

        if (this.state.promotionMove) {
            pieceMoved = this.state.promotion(x, y)
        } else if (!this.state.historyMode) {
            pieceMoved = this.state.click(Math.floor(y / 100) * 8 + Math.floor(x / 100));
        }

        //if a piece moved, record current state
        if (pieceMoved) {
            this.copyState();
        }

        return pieceMoved;
    }

    keyPress(key) {
        this.state.historyMode = true;

        //if current state is last recorded state, exit history mode
        if (this.history.keyPress(key)) {
            this.state.historyMode = false;
        }
    }


    copyState() {
        this.history.record(this.state);
        let newState = new GameState(this.state.playerTurn);
        newState.pieces = this.state.pieces.copy();
        newState.calculateMoves();

        this.pgn.movePlayed(this.state.movePlayedPGN, newState.pieces.isCheckMate);

        this.state = newState;
    }

    isAValidMove(squareId) {
        return this.state.isAValidMove(squareId);
    }

    draw() {
        if (!this.state.historyMode)
            this.state.draw();
        else
            this.history.displayState().draw();

        this.pgn.draw();
    }
}
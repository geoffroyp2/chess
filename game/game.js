class Game {
    constructor() {
        this.state = new GameState("W");
        this.history = new GameHistory();
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

    click(squareId) {
        //if a piece moved, record current state
        if (this.state.click(squareId)) {
            this.history.record(this.state);
            this.copyState();
        };
    }

    keyPress(key) {
        this.state.historyMode = true;

        //if current state is last recorded state, exit history mode
        if (this.history.keyPress(key)) {
            this.state.historyMode = false;
        }
    }


    copyState() {
        let newState = new GameState(this.state.playerTurn);
        newState.pieces = this.state.pieces.copy();
        this.state = newState;
    }

    isAValidMove(squareId) {
        return this.state.validMoves.includes(squareId)
    }

    historyMode() {
        return this.state.historyMode;
    }

    draw() {

        if (!this.historyMode())
            this.state.draw();
        else
            this.history.displayState().draw();
    }
}
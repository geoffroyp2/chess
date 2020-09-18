class Game {
    constructor() {
        this.state = new GameState("W");
        this.history = new GameHistory();

        this.state.newGame("STANDARD");
    };

    reset() {
        this.state = new GameState("W");
        this.history = new GameHistory();
        this.state.newGame("STANDARD");
    }

    click(squareId) {
        //if a piece moved, record current state
        if (this.state.click(squareId)) {
            this.history.record(this.state);
            // this.history.print();
            this.copyState();
        };
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
        this.state.draw();
    }
}
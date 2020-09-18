class Board {
    constructor() {
        this.squares = [...Array(64)].map((x, idx) => new Square(idx));
        this.game = new Game();

        this.draw();
    }

    reset() {
        this.game.reset();
        this.draw();
    }

    click(x, y) {
        if (!this.game.historyMode()) {
            let squareId = (Math.floor(y / 100) * 8 + Math.floor(x / 100));
            this.game.click(squareId);
            this.draw();
        }
    }

    keyPress(key) {
        this.game.keyPress(key);
        this.draw();
    }

    draw() {
        for (let s of this.squares) {
            s.draw(this.game.historyMode() ? false : this.game.isAValidMove(s.id));
        }
        this.game.draw();
    }
}
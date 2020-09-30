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
        this.game.click(x, y);
        this.draw();
    }

    keyPress(key) {
        this.game.keyPress(key);
        this.draw();
    }

    draw() {
        for (let s of this.squares)
            s.drawSquare();

        this.game.draw();

        for (let s of this.squares)
            s.drawMove(this.game.state.historyMode ? false : this.game.isAValidMove(s.id));

        if (this.game.state.promotionMove)
            this.game.state.drawPromotion();
    }
}
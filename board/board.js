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
        // this.boardState.historyMode = true;

        // switch (key) {
        //     case "ArrowRight":
        //         if (this.boardState.historyIdx < this.boardState.historyLength - 1)
        //             this.boardState.historyIdx++;
        //         break;
        //     case "ArrowLeft":
        //         if (this.boardState.historyIdx > 0)
        //             this.boardState.historyIdx--;
        //         break;
        //     case "ArrowUp":
        //         this.boardState.historyIdx = 0;
        //         break;
        //     case "ArrowDown":
        //         this.boardState.historyIdx = this.boardState.historyLength - 1;
        //         break;
        // }

        // if (this.boardState.historyIdx == this.boardState.historyLength - 1) {
        //     this.boardState.historyMode = false;
        // }

        // this.draw();
    }

    recordState() {
        // this.state.record(this.pieces);
        // for (let p of this.pieces) {
        //     p.recordState();
        // }
        // this.boardState.historyLength++;
        // this.boardState.historyIdx++;
    }

    draw() {

        if (!this.game.historyMode()) {
            for (let s of this.squares) {
                s.draw(this.game.isAValidMove(s.id));
            }
            this.game.draw();
        }


        // if (!this.boardState.historyMode) {
        //     for (let s of this.squares) {
        //         s.draw(this.boardState.validMoves.includes(s.id));
        //     }
        //     for (let p of this.pieces) {
        //         p.draw(p == this.boardState.pSelected);
        //     }
        // } else {
        //     for (let s of this.squares) {
        //         s.draw(false);
        //     }
        //     for (let p of this.pieces) {
        //         p.drawHistory(this.boardState.historyIdx);
        //     }
        // }
    }
}
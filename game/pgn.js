class PGN {
    constructor() {
        this.moves = [];
        this.count = 0;
    }

    movePlayed(move, isCheckMate) {
        if (move) {
            if (isCheckMate) {
                move = move.slice(0, -1) + "#";
            }
            if (this.count % 2 == 0) {
                move = (this.count / 2 + 1) + '. ' + move;
            }
            this.moves.push(move);

            this.count++;
        }
    }

    draw() {
        // print(this.moves);

        fill(190, 190, 190).textSize(25);
        noStroke();
        let j = 0;
        for (let i = 0; i < this.moves.length; i++) {
            if (i % 2 == 0) j++;
            text(this.moves[i], i % 2 == 0 ? 850 : 850 + (this.moves[i - 1].length * 25), j * 30 + 150)
        }
    }
}
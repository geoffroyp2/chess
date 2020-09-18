class GameHistory {
    constructor() {
        this.history = [];
        this.cursor = -1;
    }

    record(state) {
        this.history.push(state);
        this.cursor++;
    }

    print() {
        for (let s of this.history) {
            print(s.pieces);
        }
    }
};
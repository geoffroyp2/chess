class GameHistory {
    constructor() {
        this.history = [];
        this.cursor = -1;
    }

    record(state) {
        this.history.push(state);
        this.cursor++;
    }

    keyPress(key) {
        switch (key) {
            case "ArrowRight":
                if (this.cursor < this.history.length - 1)
                    this.cursor++;
                break;
            case "ArrowLeft":
                if (this.cursor > 0)
                    this.cursor--;
                break;
            case "ArrowUp":
                this.cursor = 0;
                break;
            case "ArrowDown":
                this.cursor = this.history.length - 1;
                break;
        }

        //if current state is last state, return true
        return (this.cursor == this.history.length - 1)
    }

    displayState() {
        return this.history[this.cursor];
    }

    print() {
        for (let s of this.history) {
            print(s.pieces);
        }
    }
};
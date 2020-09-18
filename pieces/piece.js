class Piece {
    constructor([team, id, square]) {
        this.team = team;
        this.color = team == "W" ? color(255, 255, 255) : color(0, 0, 0);
        this.id = id;
        this.coordinates = { x: -1, y: -1, squareId: square };
        this.move(square);

        this.history = [];
    }

    move(square) {
        this.coordinates.squareId = square;
        this.coordinates.x = square % 8;
        this.coordinates.y = Math.floor(square / 8);
    }

    recordState() {
        this.history.push({ x: this.coordinates.x, y: this.coordinates.y, removed: this.removed });
    }

    remove() {
        this.removed = true;
        this.coordinates.x = -1;
        this.coordinates.y = -1;
        this.coordinates.squareId = -1;
    }

    avoidCheck(validMoves, pieces) {
    }

    draw(highlight) {
        if (!this.removed) {
            fill(this.color).textSize(80);
            noStroke();
            if (highlight) {
                strokeWeight(3);
                stroke(210, 0, 0);
            }
            text(this.type, this.coordinates.x * 100 + 50, this.coordinates.y * 100 + 80);
        }
    }

    drawHistory(idx) {
        if (!this.history[idx].removed) {
            fill(this.color).textSize(80);
            noStroke();
            text(this.type, this.history[idx].x * 100 + 50, this.history[idx].y * 100 + 80);
        }
    }
};
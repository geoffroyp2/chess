class Piece {
    constructor([team, id, square]) {
        this.team = team;
        this.color = team == "W" ? color(255, 255, 255) : color(0, 0, 0);
        this.id = id; //useless for now
        this.coordinates = { x: -1, y: -1, squareId: square };
        this.move(square);
    }

    getInfos() {
        //Used for deep copy of pieces, along with individual copy() methods
        return [this.team, this.id, this.coordinates.squareId];
    }

    move(square) {
        this.coordinates.squareId = square;
        this.coordinates.x = square % 8;
        this.coordinates.y = Math.floor(square / 8);
    }

    remove() {
        this.removed = true;
        this.coordinates.x = -1;
        this.coordinates.y = -1;
        this.coordinates.squareId = -1;
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
};
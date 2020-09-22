class Square {
    constructor(id) {
        this.id = id;
        this.position = createVector((this.id % 8) * 100, Math.floor(this.id / 8) * 100);
        this.color = (Math.floor(this.id / 8) % 2 == 0 ? this.id % 2 == 0 : this.id % 2 == 1) ? color(190, 180, 180) : color(50, 70, 60);
    }

    drawSquare() {
        noStroke();
        fill(this.color);
        square(this.position.x, this.position.y, 100);

        //DEBUG square ID
        fill(0, 0, 0).textSize(10);
        text(this.id, this.position.x + 90, this.position.y + 90);
    }

    drawMove(isAValidMove) {
        if (isAValidMove) {
            noStroke();
            fill(10, 10, 150, 200);
            circle(this.position.x + 50, this.position.y + 50, 30)
        }
    }
};